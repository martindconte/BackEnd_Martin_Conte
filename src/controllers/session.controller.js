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
        if (user && await user.checkPassword(password)) {
            const userLog = {
                username: email,
                role: user.role,
                cartId: user.cart.toString()
            }
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

const logOut = (req, res) => {
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

            console.log('errror.-..........................', error)

            if (error) return res.redirect('/reset-password')

            const { _id } = decode
            const user = await userService.getById({ _id })
            user.password = password

            await userService.save(user)

            // const newData = {
            //     _id: decode._id,
            //     first_name: decode.first_name,
            //     last_name: decode.last_name,
            //     email: decode.email,
            //     age: decode.age,
            //     cart: decode.cart,
            //     rol: decode.role,
            //     password
            // }

            // await userService.updateById( decode._id, newData, {})
        })

        res.redirect('/login')

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