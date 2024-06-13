import { cartService } from "../../service/index.service.js"

const renderCartById = async ( req, res, next ) => {

    try {

        console.log(req.session.user);
        const { cartId } = req.session.user 

        const { cid } = req.params

        if( cartId != cid ) {
            return res.redirect('/')
            // res.redirect
            // next()
        }

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