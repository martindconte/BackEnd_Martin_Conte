import express from "express"
import { addProductsToCart, createNewCart, getCartById } from "../controllers/carts.controller.js"

const router = express.Router()

router.get('/', (req, resp) => {
    resp.send('<h1 style="color: red">Servidor Express /// Desde Cart</h1>')
})
router.post( '/', createNewCart )

router.get('/:cid', getCartById )

router.post('/:cid/product/:pid', addProductsToCart)

export default router