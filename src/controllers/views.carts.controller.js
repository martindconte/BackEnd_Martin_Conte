import cartService from "../dao/carts.models.js";

const renderCartById = async ( req, res ) => {
    try {
        const { cid } = req.params
        const cart = await cartService.getById(cid).lean()
        console.log(JSON.stringify(cart))
        res.render('cartDetail', {
            pageName: 'Cart',
            layout: 'main',
            cart,
            user: {email: req.session.username}
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Internal server error... Could not retrieve shopping cart data.' })
    }
}

export {
    renderCartById
}