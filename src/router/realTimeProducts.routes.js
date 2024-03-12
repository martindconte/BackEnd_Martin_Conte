import express from "express"
import { getProductsRealTime } from "../controllers/realTimeProducts.controller.js"

const router = express.Router()

router.get('/', getProductsRealTime)

export default router