import express from "express"
import { renderProducts } from "../controllers/index.controller.js"

const router = express.Router()

router.route('/')
    .get( renderProducts )

export default router