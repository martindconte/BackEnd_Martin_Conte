import UserDTO from "../../dao/DTO/user.dto.js"
import { userService } from "../../service/index.service.js"

export const renderLogin = (req, res) => {

    const { errorMessages } = req.query

    const msg = errorMessages
        ? JSON.parse(errorMessages)
        : []

    res.render('login', {
        layout: false,
        msg
    })
}

export const renderRegister = (req, res) => {

    const { errorMessages } = req.query

    const msg = errorMessages
        ? JSON.parse(errorMessages)
        : []

    res.render('registerNewUser', {
        layout: false,
        msg
    })
}

export const userDataLog = async (req, res) => {
    try {
            const { user } = req.session
            if(typeof user === 'undefined') return res.redirect('/login')
        if ( user?.username === process.env.APP_ADMIN_EMAIL ) {
            const userAdmin = {
                email: user.username,
                role: 'admin',
            }
            res.render('home', {
                pageName: 'User Data',
                userDTO: userAdmin,
            })
        } else {
            const [ userLog ] = await userService.get({ email: user.username })
            const userDTO = new  UserDTO(userLog)

            res.render('home', {
                pageName: 'User Data',
                userDTO: { ...userDTO,  },
                notAdmin: true
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
}

export const resetPassword = (req, res) => {
    res.render('resetPassword', {
        layout: false
    })
}

export const changePassword = ( req, res ) => {
    res.render('changePassword', {
        layout: false
    })
}