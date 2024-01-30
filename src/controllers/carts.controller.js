import { CartManager } from "../models/Carts.js";
import __dirname from "../utils.js";

const cartManager = new CartManager( __dirname + '/public/data')

const createNewCart = async ( req, res ) => {
    try {
        await cartManager.newCart()
        res.status(200).send({status: "Cart created!"});
    } catch (error) {
        res.status(500).send({ error: 'Internal server error - Cart not created' });
    }
}

const getCartById = async ( req, res ) => {
    try {
        const cart = await cartManager.getCartById( req.params.cid )
        if (!cart) return res.status(404).send({ error: `Product id: ${req.params.pid} not found` })
        res.json(cart)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

const addProductsToCart = async ( req, res ) => {
    try {
        await cartManager.addProductToCart( req.params.cid, req.params.pid )
        const cart = await cartManager.getCartById( req.params.cid )
        res.json(cart)
    } catch (error) {
        console.log(error)
        res.status(404).send({error})
    }
}

export {
    createNewCart,
    getCartById,
    addProductsToCart
}