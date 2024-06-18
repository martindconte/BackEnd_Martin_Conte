import jwt from "jsonwebtoken"
import { userService } from "../service/index.service.js"
import { jwtSecret } from "../config/config.js"
import { MailingService } from "../service/mails/mail.service.js"

const singIn = async (req, res) => {

    const msg = []

    const userAdmin = {
        email: process.env.APP_ADMIN_EMAIL,
        password: process.env.APP_ADMIN_PASS
    }

    try {
        const { email, password } = req.body

        if (email == userAdmin.email && password == userAdmin.password) {
            const userAdmin = {
                username: email,
                role: 'ADMIN',
            }
            req.session.user = userAdmin
            await req.session.save()
            return res.redirect('/current')
        }

        const [user] = await userService.get({ email })

        console.log('user signIn ------------------------>', user);

        if (user && await user.checkPassword(password)) {
            const userLog = {
                id: user._id.toString(),
                username: email,
                role: user.role,
                cartId: user.cart.toString(),
                profileImg: 'src/public' + user.profile_image
            }
            
            await userService.updateById(user._id, { last_connection: new Date() });
            req.session.user = userLog
            await req.session.save()
            return res.redirect('/current')
        } else {
            msg.push('Datos Incorrectos')
            res.redirect(`/login?errorMessages=${JSON.stringify(msg)}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The database query could not be performed to get users' });
    }
}

const logOut = async (req, res) => {

    const { id } = req.session.user

    const user = await userService.getById({ id })

    await userService.updateById(user._id, { last_connection: new Date() });
        
    req.session.destroy((error) => {
        if (error) {
            res.redirect('/')
        } else {
            res.render('logout', {})
        }
    })
}

const resetPassword = async (req, res) => {

    const { email } = req.body
    try {

        const [user] = await userService.get({ email })
        if (!user) return res.redirect('/')
        const { password, ...userPayload } = user.toObject();
        const passwordResetToken = jwt.sign(userPayload, jwtSecret.secret, { expiresIn: '1h' })

        await MailingService.sendPasswordResetMail(userPayload, email, passwordResetToken)

        res.redirect('/')

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The email query could not be performed to get users' });
    }
}

const newPassword = async (req, res) => {

    const { token } = req.params
    const { password } = req.body

    try {
        jwt.verify(token, jwtSecret.secret, async (error, decode) => {

            if (error) return res.redirect('/reset-password')

            const { _id } = decode
            const user = await userService.getById({ _id })
            
            if (await user.checkPassword(password)) {
                return res.redirect(`/login?errorMessages=[${JSON.stringify('The password must be different')}]`)
            }
            
            user.password = password
            await userService.save(user)
            res.redirect(`/login?errorMessages=[${JSON.stringify('The password has been changed')}]`)
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The email query could not be performed to get users' });
    }
}

export {
    singIn,
    logOut,
    resetPassword,
    newPassword
}