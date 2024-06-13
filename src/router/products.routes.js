import express from "express"
import { getProducts, addProducts, updatedProduct, getProductById, deleteProduct } from "../controllers/products.controller.js"
import { checkRole } from "../middlewares/role.middleware.js"

const router = express.Router()

// api/products

router.route('/')
    // .get( getProducts )
    .get( checkRole(['ADMIN', 'PREMIUM']), getProducts )
    .post( checkRole(['ADMIN', 'PREMIUM']), addProducts )

router.route('/:pid')
    .get( checkRole(['ADMIN', 'PREMIUM']), getProductById )
    .put( checkRole(['ADMIN', 'PREMIUM']), updatedProduct )
    .delete( checkRole(['ADMIN', 'PREMIUM']), deleteProduct )

export default router