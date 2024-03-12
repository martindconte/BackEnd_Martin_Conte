import userService from "../dao/users.models.js";

const singIn = async (req, res) => {
    
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

        if(user && user.password === password) {
            req.session.username = email

            await req.session.save()

            res.redirect('/')
        } else {
            msg.push('Datos Incorrectos')
            res.redirect(`/login?errorMessages=${JSON.stringify(msg)}`)
        }
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

        await userService.create(req.body)
        res.redirect('/login')
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            msg.push('Email ya registrado')
            res.redirect(`/register?errorMessages=${JSON.stringify(msg)}`)
        } else {
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