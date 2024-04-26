import { userService } from "../service/index.service.js"

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

export {
    singIn,
    logOut
}