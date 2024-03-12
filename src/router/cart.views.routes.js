import express from "express"
import { renderCartById } from "../controllers/views.carts.controller.js"

const router = express.Router()

router.get('/:cid', renderCartById)

export default router