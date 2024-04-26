import { cartService } from "../../service/index.service.js"

const renderCartById = async ( req, res ) => {

    try {
        const { cid } = req.params
        const cart = await cartService.getById(cid)
        const cartPlanned = cart.toObject()
        res.render('cartDetail', {
            pageName: 'Cart',
            layout: 'main',
            cart: cartPlanned,
            userDTO: req.session.user
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Internal server error... Could not retrieve shopping cart data.' })
    }
}

export {
    renderCartById
}