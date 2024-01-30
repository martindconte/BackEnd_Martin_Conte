import express from "express"
import { getProducts, addProducts, updatedProduct, getProductById, deleteProduct } from "../controllers/products.controller.js"

const router = express.Router()

router.route('/')
    .get( getProducts )
    .post( addProducts )

router.route('/:pid')
    .get( getProductById )
    .put( updatedProduct )
    .delete( deleteProduct )

export default router