import express from "express"
import { getChat, newMessage } from "../controllers/chat.controller.js"

const router = express.Router()

router.route('/')
    .get( getChat )
    .post( newMessage )

export default router