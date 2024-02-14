import express from "express"
import { addProductsToCart, createNewCart, deleteAllProductsInCart, deleteProductInCart, getCartById, updateProductsInCart, updateQuantity } from "../controllers/carts.controller.js"

const router = express.Router()

router.get('/', (req, resp) => {
    resp.send('<h1 style="color: red">Servidor Express /// Desde Cart</h1>')
})

router.route( '/' )
    .post( createNewCart )

router.route( '/:cid' )
    .get( getCartById )
    .put( updateProductsInCart )
    .delete( deleteAllProductsInCart )

router.route( '/:cid/product/:pid' )
    .post( addProductsToCart )
    .put( updateQuantity )
    .delete( deleteProductInCart )

export default router