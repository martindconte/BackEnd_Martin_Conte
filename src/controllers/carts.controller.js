import { cartModel } from "../dao/models/carts.models.js";
import { productsModel } from "../dao/models/products.models.js";

const getCartById = async ( req, res ) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findById( cid )
        res.send(cart)
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: 'Internal server error... Could not retrieve shopping cart data.' });
    }
}

const addProductsToCart = async ( req, res ) => {
    try {
        const { pid, cid } = req.params

        const cart = await cartModel.findById(cid)
        const product = await productsModel.findById(pid)

        if (!cart || !product) res.status(404).send({error: 'There are no products or carts created with those ids. Create a new cart or verify the id'}) 

        const productExist = cart.products.some( item => item.product.equals(pid) ) 
        
        if(productExist) {
            const cartProductIndex = cart.products.findIndex( item => item.product.equals(pid))
            cart.products[cartProductIndex].quantity++
        } else {
            cart.products.push({
                product: product._id,
                quantity: 1,
            })
        }

        await cartModel.updateOne({_id: cid}, cart, { returnNewDocument: true })
        res.json(prueba)
    } catch (error) {
        console.error(error)
        res.status(404).send(error.message)
    }
}

const createNewCart = async ( req, res ) => {
    try {
        const newCart = await cartModel.create({})
        res.status(200).send({status: "Cart created!", newCart});
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: 'Internal server error - Cart not created' });
    }
}

export {
    createNewCart,
    getCartById,
    addProductsToCart
}
