import { cartModel } from "../dao/models/carts.models.js";
import { productsModel } from "../dao/models/products.models.js";
// import { CartManager } from "../models/Carts.js";
// import __dirname from "../utils.js";

// const cartManager = new CartManager( __dirname + '/public/data')

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

        const productExist = cart.products.some( product => product.productsId.equals(pid) ) 
        
        if(productExist) {
            const cartProductIndex = cart.products.findIndex(product => product.productsId.equals(pid))
            cart.products[cartProductIndex].quantity++
        } else {
            cart.products.push({
                productsId: product._id,
                quantity: 1,
            })
        }

        await cartModel.updateOne({_id: cid}, cart, { returnNewDocument: true })
        res.json(cart)
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


// import { CartManager } from "../models/Carts.js";
// import __dirname from "../utils.js";

// const cartManager = new CartManager( __dirname + '/public/data')

// const createNewCart = async ( req, res ) => {
//     try {
//         await cartManager.newCart()
//         res.status(200).send({status: "Cart created!"});
//     } catch (error) {
//         res.status(500).send({ error: 'Internal server error - Cart not created' });
//     }
// }

// const getCartById = async ( req, res ) => {
//     try {
//         const cart = await cartManager.getCartById( req.params.cid )
//         if (!cart) return res.status(404).send({ error: `Product id: ${req.params.pid} not found` })
//         res.json(cart)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: 'Internal server error' });
//     }
// }

// const addProductsToCart = async ( req, res ) => {
//     try {
//         await cartManager.addProductToCart( req.params.cid, req.params.pid )
//         const cart = await cartManager.getCartById( req.params.cid )
//         res.json(cart)
//     } catch (error) {
//         console.log(error)
//         res.status(404).send({error})
//     }
// }

// export {
//     createNewCart,
//     getCartById,
//     addProductsToCart
// }