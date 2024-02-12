import { productsModel } from "../dao/models/products.models.js"

const getProductsRealTime = async (req, res, next) => {
    try {
        const products  = await productsModel.find().limit(req.query.limit)

        if(!products) return next()

        const plainProducts = products.map(product => product.toObject());

        res.render('realTimeProducts', {
            pageName: 'Real Time',
            layout: 'main',
            products: plainProducts
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).send({ error });
    }
}

export {
    getProductsRealTime,
}