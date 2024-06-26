import express from "express"
import { checkLogged, userNotLogged } from "../middlewares/auth.js"
import UserDTO from "../dao/DTO/user.dto.js"
import { userService } from "../service/index.service.js"

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

router.get('/current', checkLogged, async (req, res) => {
    try {
            const { user } = req.session
            if(typeof user === 'undefined') return res.redirect('/login')
        if ( user?.username === process.env.APP_ADMIN_EMAIL ) {
            const userAdmin = {
                email: username,    
                role: 'admin'
            }
            res.render('home', {
                pageName: 'User Data',
                user: userAdmin
            })
        } else {
            const [ userLog ] = await userService.get({ email: user.username })
            const userDTO = new  UserDTO(userLog)
            res.render('home', {
                pageName: 'User Data',
                userDTO
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
})

export default router