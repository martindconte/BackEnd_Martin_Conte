import path from 'path'
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv'
import swaggerUiExpress from 'swagger-ui-express'
import productsRouter from './router/products.routes.js';
import cartRouter from './router/cart.routes.js'
import sessionRouter from './router/sessions.routes.js'
import viewsRouter from './router/views/views.routes.js'
import loggerTest from './router/loggerTest.routes.js'
import userRouter from './router/user.routes.js'
import { helpersHbs } from './helpers/helper.handlebars.js';
import { connectDB } from './config/db.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import __dirname from './utils.js';
import errorHandling from './middlewares/errorHandling.middleware.js';
import addLogger from './middlewares/logger.middleware.js';
import swaggerJSDoc from 'swagger-jsdoc';

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

app.use(addLogger)
app.use(passport.initialize())

// swagger documentation
const swaggerOption = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'e-commerce Coder Documentation',
            description: 'Entrega Coder'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOption)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

// authentication routes
app.use('/api/sessions', sessionRouter)
app.use('/', ioMiddleware, viewsRouter)
app.use('/loggerTest', loggerTest)
// Routing
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/user', userRouter)

app.use(errorHandling)