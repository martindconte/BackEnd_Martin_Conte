import { cartService, userService } from "../service/index.service.js"

export const createUser = async (req, res, next) => {
    const msg = []
    try {
        const { first_name, last_name, email, age, password } = req.body

        if (age < 17) msg.push('Edad minima 18 años')

        const cart = await cartService.create()
        const userData = {
            first_name,
            last_name,
            email,
            age,
            password,
            cart: cart._id
        }
        await userService.create( userData )
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