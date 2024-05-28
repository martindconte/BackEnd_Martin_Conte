import express from "express"
import { changeRole } from "../controllers/user.controller.js"
import { checkRole } from "../middlewares/role.middleware.js"

const router = express.Router()

router.post('/premium/:uid', checkRole(['user', 'PREMIUM']) ,changeRole)

export default router