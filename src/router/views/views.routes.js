import express from "express"
import { renderLogin, renderRegister, userDataLog } from "../../controllers/views/auth.views.controller.js"
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
router.get('/realtimeproducts', checkLogged, checkRole('ADMIN'), getProductsRealTime)
router.get('/mockingproducts', checkLogged, checkRole('ADMIN'), renderMockingProducts)
router.use('/chat', checkLogged, checkRole('user'), chatRouter)
router.use('/products', checkLogged, productsViewsRouter)
router.use('/cart/:cid', checkLogged, checkRole('user') ,renderCartById)

router.get('/', ( req, res ) => {

    // todo crear una pagina de inicio. Aun no solicitadas
    res.redirect('/products')
})


export default router