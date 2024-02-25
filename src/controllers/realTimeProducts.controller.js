// import { productsModel } from "../dao/products.models.js"
import productService from "../dao/products.models.js"
// import Products from "../dao/products.models.js"

// const productService = new Products()

const getProductsRealTime = async (req, res, next) => {
    try {

        const products  = await productService.get().lean()

        if(!products) return next()

        res.render('realTimeProducts', {
            pageName: 'Real Time',
            layout: 'main',
            products
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).send({ error });
    }
}

// const getProductsRealTime = async (req, res, next) => {
//     try {

//         const { io } = req

//         const products  = await productsModel.find()

//         if(!products) return next()

//         const plainProducts = products.map(product => product.toObject());

//         res.render('realTimeProducts', {
//             pageName: 'Real Time',
//             layout: 'main',
//             products: plainProducts
//         })
//     } catch (error) {
//         console.log(error.message)
//         res.status(404).send({ error });
//     }
// }

export {
    getProductsRealTime,
}