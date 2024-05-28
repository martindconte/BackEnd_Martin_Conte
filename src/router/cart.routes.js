import express from "express"
import { addProductsToCart, createNewCart, deleteAllProductsInCart, deleteProductInCart, getAllCarts, getCartById, purchaseCart, updateProductsInCart, updateQuantity } from "../controllers/carts.controller.js"
import { checkRole } from "../middlewares/role.middleware.js"

const router = express.Router()

// api/carts

router.route( '/' )
    .get( checkRole('ADMIN'), getAllCarts )
    .post( checkRole('ADMIN'), createNewCart )

router.route( '/:cid' )
    .get( getCartById )
    .put( updateProductsInCart )
    .delete( deleteAllProductsInCart )

router.route( '/:cid/purchase' )
    .post( purchaseCart )

router.route( '/:cid/product/:pid' )
    .post( checkRole(['user', 'PREMIUM']), addProductsToCart )
    .put( checkRole(['user', 'PREMIUM']), updateQuantity )
    .delete( checkRole(['user', 'PREMIUM']), deleteProductInCart )

export default router