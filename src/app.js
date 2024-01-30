import path from 'path'
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './router/products.routes.js';
import cartRouter from './router/cart.routes.js'
import indexRouter from './router/index.routes.js'
import realTimeProducts from './router/realTimeProducts.routes.js'
import __dirname from './utils.js';

// Crear la app
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Template Engine
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.engine('handlebars',
    handlebars.engine({
        defaultLayout: 'main'
    }))

// Routing
app.use('/', indexRouter)
app.use('/realtimeproducts', realTimeProducts)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

// Definir un puerto y arrancar el proyecto
const port = 8080;
const httpServer = app.listen(port, () => console.log(`Listening app port ${httpServer.address().port}`))

// Configuracion de Web Socket
const io = new Server(httpServer)
io.on('connection', socket => {
    console.log('a user has connected!')

    socket.on('delete-product', data => {
        console.log('Se ha ELIMINADO el ID: ' + data.productId)
        io.emit('update-products', data.products )
    })

    socket.on('add-products', ({ newProduct, products }) => {
        console.log('Se agrego el producto code: ' + newProduct.code)
        io.emit('update-products', products )
    })

    socket.on('disconnect', () => {
        console.log('an user has disconnected! Bye')
    })
})