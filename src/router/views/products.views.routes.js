import express from "express"
import { renderProducts, renderProductsById } from "../../controllers/views/products.views.controller.js"

const router = express.Router()

router.get('/', renderProducts)
router.get('/:pid', renderProductsById)

export default router