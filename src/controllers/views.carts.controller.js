import cartService from "../dao/carts.models.js";

const renderCartById = async ( req, res ) => {
    try {
        const { cid } = req.params
        const cart = await cartService.getById(cid).lean()
        res.render('cartDetail', {
            pageName: 'Cart',
            layout: 'main',
            cart,
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: 'Internal server error... Could not retrieve shopping cart data.' })
    }
}

export {
    renderCartById
}