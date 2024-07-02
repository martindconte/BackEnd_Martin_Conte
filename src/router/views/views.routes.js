import express from "express"
import { changePassword, renderLogin, renderRegister, resetPassword, userDataLog } from "../../controllers/views/auth.views.controller.js"
import { getProductsRealTime } from "../../controllers/views/realTimeProducts.controller.js"
import { renderMockingProducts } from "../../controllers/views/products.views.controller.js"
import { renderCartById } from "../../controllers/views/carts.views.controller.js"
import chatRouter from "../views/chat.views.routes.js"
import productsViewsRouter from '../views/products.views.routes.js'
import { checkLogged, userNotLogged } from "../../middlewares/auth.js"
import { checkRole } from "../../middlewares/role.middleware.js"

const router = express.Router()

router.get('/login', userNotLogged, renderLogin)
router.get('/register', renderRegister)
router.get('/current', userDataLog)
router.get('/reset-password', resetPassword)
router.get('/change-password/:token', changePassword)
router.get('/realtimeproducts', checkLogged, checkRole(['ADMIN', 'PREMIUM']), getProductsRealTime)
router.get('/mockingproducts', checkLogged, checkRole('ADMIN'), renderMockingProducts)

router.use('/chat', checkLogged, checkRole(['user','PREMIUM']), chatRouter)
router.use('/products', checkLogged, productsViewsRouter)
router.use('/cart/:cid', checkLogged, checkRole(['user','PREMIUM']) ,renderCartById)
router.get('*', ( req, res ) => res.redirect('/products'))

router.get('/', ( req, res ) => {

    // todo crear una pagina de inicio. Aun no solicitadas
    res.redirect('/products')
})


export default router