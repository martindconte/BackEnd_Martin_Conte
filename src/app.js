import path from 'path'
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { checkLogged } from './middlewares/auth.js';
import productsRouter from './router/products.routes.js';
import cartRouter from './router/cart.routes.js'
import sessionRouter from './router/sessions.routes.js'
import productsViewsRouter from './router/products.views.routes.js'
import cartViewsRouter from './router/cart.views.routes.js'
import authViewsRouter from './router/auth.views.routes.js'
import realTimeProductsRouter from './router/realTimeProducts.routes.js'
import chatRouter from './router/chat.routes.js'
import { helpersHbs } from './helpers/helper.handlebars.js';
import { connectDB } from './config/db.js';
import passport from 'passport';
import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';
import dotenv from 'dotenv'

// enviroment
dotenv.config()

// Crear la app
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Data BAse
connectDB()

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Template Engine
app.engine('handlebars', handlebars.engine({
    helpers: helpersHbs,
}))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

// passport
initializePassport()

// session configuration
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 8080;
const httpServer = app.listen(port, () => console.log(`Listening app port ${httpServer.address().port}`))

// Configuracion de Web Socket
const io = new Server(httpServer)

// middleware para io
const ioMiddleware = (req, res, next) => {
    req.io = io
    next()
}

io.on('connection', socket => {
    console.log('a user has connected! id: ', socket.id)

    // socket products
    socket.on('delete-product', data => {
        console.log('Se ha ELIMINADO el ID:' + data)
        io.emit('update-products')
    })

    socket.on('add-products', (product) => {
        console.log('Desde App... Add-products', product)
        console.log('Desde Socket... Se agrego el producto code: ' + product.code)
        console.log('Desde app socket... products', product._id)
        io.emit('update-products')
    })

    socket.on('disconnect', () => {
        console.log('an user has disconnected! Bye id:', socket.id)
    })
})

app.use(passport.initialize())

// authentication routes
app.use('/', authViewsRouter)
app.use('/api/sessions', sessionRouter)
// route validation
app.use(checkLogged)


// Routing
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/realtimeproducts', realTimeProductsRouter)
app.use('/chat', ioMiddleware, chatRouter)
app.use('/products', productsViewsRouter)
app.use('/cart', cartViewsRouter)