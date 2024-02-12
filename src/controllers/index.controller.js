import { productsModel } from "../dao/models/products.models.js"

const renderProducts = async (req, res) => {
    try {
        const products = await productsModel.find().limit(req.query.limit)

        const plainProducts = products.map(product => product.toObject());

        res.render('index', {
            pageName: 'Inicio',
            products: plainProducts,
            layout: 'main'
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: 'Internal server error. No se a accedido al servidor...' });
    }
}

export {
    renderProducts
}


// import { ProductManager } from "../models/Products.js"

// const productManager = new ProductManager(process.cwd() + '/src/public/data')

// const renderProducts = async ( req, res ) => {
//     try {
//         const products = await productManager.getProducts( req.query.limit )
//         res.render('index', {
//                     pageName: 'Inicio',
//                     products,
//                     layout: 'main'
//                 })
//     } catch (error) {
//         console.log(error)
//     }
// }

// export {
//     renderProducts
// }