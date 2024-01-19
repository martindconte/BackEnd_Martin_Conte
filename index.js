import path from 'path'
import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './router/productsRoutes.js';
import cartRouter from './router/cartRoutes.js'
import __dirname from './utils.js';

// Crear la app
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Template Engine
app.engine('handlebars',
    handlebars.engine({
        defaultLayout: 'main'
    }))

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Routing
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.get('/', async (req, resp) => {
    // const response = {name: 'Martin'}

    const response = await fetch('http://localhost:8080/api/products')
    const products = await response.json()
    // console.log(Array.isArray(products))
    resp.render('index', {
        pageName: 'e-COMMERCE',
        products,
        layout: 'main'
    })
})

// Definir un puerto y arrancar el proyecto
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Listening app port ${server.address().port}`)
})