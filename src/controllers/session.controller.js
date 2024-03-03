import userService from "../dao/users.models.js";

const getUser = async (req, res) => {
    try {
        const { email, password } = req.body

        console.log({ email })
        console.log({ password })
        console.log('Hola... desde login')
        console.log(req.session)
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The database query could not be performed to get users' });
    }
}

const createUser = async (req, res, next) => {

    const msj = []
    const { errorMessages } = req.query
    console.log(errorMessages)

    try {
        const { first_name, last_name, email, age, password } = req.body

        if (age < 17) msj.push('Edad minima 18 años')

        await userService.create(req.body)
        res.redirect('/login')
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            msj.push('Email ya registrado')
            res.redirect(`/register?errorMessages=${JSON.stringify(msj)}`)
        } else {
            msj.push('Revisa la informacion ingresada. TODOS los campos son obligatorios')
            // res.redirect('/register')
            res.redirect(`/register?errorMessages=${JSON.stringify(msj)}`)
        }
    }
    // console.log(error)
    // res.status(500).send({ status: 'error', error: 'Internal Server Error. The database query to create new users could not be performed.' });
}

export {
    getUser,
    createUser
}