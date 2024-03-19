import userService from "../dao/users.models.js";
import { createHash, isValidPassword } from "../helpers/hash.js";

const singIn = async (req, res) => {
    
    console.log(req.body)

    const msg = []

    const userAdmin = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123'
    }

    try {
        const { email, password } = req.body

        if (email == userAdmin.email && password == userAdmin.password) {
            req.session.username = email
            await req.session.save()
            return res.redirect('/')
        }

        const user = await userService.getByEmail( email )
        console.log(user)


        // if(user && user.password === password) {
        //     req.session.username = email

        //     await req.session.save()

        //     res.redirect('/')
        // } else {
        //     msg.push('Datos Incorrectos')
        //     res.redirect(`/login?errorMessages=${JSON.stringify(msg)}`)
        // 
        // console.log('password desde form', password)
        // const passwordCheck = await user.checkPassword(password)
        const passwordCheck = isValidPassword(user, password)
        console.log(passwordCheck)
        console.log(user.password)

        if(user && passwordCheck) {
            req.session.username = email
            await req.session.save()
            res.redirect('/')
        } else {
            msg.push('Datos Incorrectos')
            res.redirect(`/login?errorMessages=${JSON.stringify(msg)}`)
        }
        // if(await userService.checkPassword( password, user.password )) {
        //     console.log('Verificado...')
        // }

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The database query could not be performed to get users' });
    }
}

const createUser = async (req, res, next) => {
    const msg = []
    try {
        const { first_name, last_name, email, age, password } = req.body

        if (age < 17) msg.push('Edad minima 18 años')

        // await userService.create(req.body)
        const user = userService.createUserInstance( req.body )
        await user.save()
        console.log(user)
        res.redirect('/login')
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            msg.push('Email ya registrado')
            res.redirect(`/register?errorMessages=${JSON.stringify(msg)}`)
        } else {
            console.log(error)
            msg.push('Revisa la informacion ingresada. Recuerda... TODOS los campos son obligatorios')
            res.redirect(`/register?errorMessages=${JSON.stringify(msg)}`)
        }
    }
}

const logOut = ( req, res ) => {
    req.session.destroy(( error ) => {
        if(error) {
            res.redirect('/')
        } else {
            res.render('logout', {})
        }
    })
}

export {
    singIn,
    createUser,
    logOut
}