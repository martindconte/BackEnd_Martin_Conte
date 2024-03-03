import express from "express"
import { createUser, getUser } from "../controllers/session.controller.js"

const router = express.Router()

router.route('/login')
    .post( getUser )

router.route('/register')
    .post( createUser )

export default router
