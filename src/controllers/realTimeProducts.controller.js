import productService from "../dao/products.models.js"

const getProductsRealTime = async (req, res, next) => {
    try {

        const products  = await productService.get().lean()

        if(!products) return next()

        res.render('realTimeProducts', {
            pageName: 'Real Time',
            layout: 'main',
            products,
            user: {email: req.session.username}
        })
    } catch (error) {
        console.log(error.message)
        res.status(404).send({ error });
    }
}

export {
    getProductsRealTime,
}