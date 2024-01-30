import { ProductManager } from "../models/Products.js"

const productManager = new ProductManager(process.cwd() + '/src/public/data')

const renderProducts = async ( req, res ) => {
    try {
        const products = await productManager.getProducts( req.query.limit )
        res.render('index', {
                    pageName: 'Inicio',
                    products,
                    layout: 'main'
                })
    } catch (error) {
        console.log(error)
    }
}

export {
    renderProducts
}