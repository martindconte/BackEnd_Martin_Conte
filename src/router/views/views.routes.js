import express from "express"
import { renderLogin, renderRegister, userDataLog } from "../../controllers/views/auth.views.controller.js"
import { getProductsRealTime } from "../../controllers/views/realTimeProducts.controller.js"
import { renderCartById } from "../../controllers/views/carts.views.controller.js"
import { ioMiddleware } from "../../middlewares/socket.js"
import chatRouter from "../views/chat.views.routes.js"
import productsViewsRouter from '../views/products.views.routes.js'
import { checkLogged, userNotLogged } from "../../middlewares/auth.js"
import { checkRole } from "../../middlewares/role.middleware.js"

const router = express.Router()

router.get('/login', userNotLogged, renderLogin)
router.get('/register', renderRegister)
router.get('/current', userDataLog)
router.get('/realtimeproducts', checkLogged, checkRole('ADMIN'), getProductsRealTime)
router.use('/chat', checkLogged, checkRole('user'), chatRouter)
router.use('/products', checkLogged, productsViewsRouter)
router.use('/cart/:cid', checkLogged, checkRole('user') ,renderCartById)

export default router