import express from "express"
import { createUser, singIn, logOut } from "../controllers/session.controller.js"

const router = express.Router()

router.route('/login')
    .post( singIn )

router.route('/register')
    .post( createUser )

router.route('/logout')
    .post( logOut )

export default router
