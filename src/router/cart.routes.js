import express from "express"
import { addProductsToCart, createNewCart, deleteAllProductsInCart, deleteProductInCart, getAllCarts, getCartById, purchaseCart, updateProductsInCart, updateQuantity } from "../controllers/carts.controller.js"

const router = express.Router()

router.route( '/' )
    .get( getAllCarts )
    .post( createNewCart )

router.route( '/:cid' )
    .get( getCartById )
    .put( updateProductsInCart )
    .delete( deleteAllProductsInCart )

router.route( '/:cid/purchase' )
    .post( purchaseCart )

router.route( '/:cid/product/:pid' )
    .post( addProductsToCart )
    .put( updateQuantity )
    .delete( deleteProductInCart )

export default router