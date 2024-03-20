import express from "express"
import userService from "../dao/users.models.js"
import { userNotLogged } from "../middlewares/auth.js"

const router = express.Router()

router.get('/login', userNotLogged, (req, res) => {

    const { errorMessages } = req.query

    const msg = errorMessages
        ? JSON.parse(errorMessages)
        : []

    res.render('login', {
        layout: false,
        msg
    })
})

router.get('/register', (req, res) => {

    const { errorMessages } = req.query

    const msg = errorMessages
        ? JSON.parse(errorMessages)
        : []

    res.render('registerNewUser', {
        layout: false,
        msg
    })
})

router.get('/', async (req, res) => {
    try {
        const { username } = req.session
        if(!username) res.redirect('/login')
        if ( username === 'adminCoder@coder.com' ) {
            const userAdmin = {
                email: username,
                role: 'admin'
            }
            res.render('home', {
                user: userAdmin
            })
        } else {
            const user = await userService.getByEmail(username).lean()
            res.render('home', {
                user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
})

export default router