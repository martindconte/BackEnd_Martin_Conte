import productService from "../dao/products.models.js";
// import Products from "../dao/products.models.js";
// import Products, { productsModel } from "../dao/products.models.js";

// const productsService = new Products()

const getProducts = async (req, res) => {

    try {

        let { limit, page, query, sort } = req.query

        const filter = query ? {
            $and: [
                { category: { $regex: new RegExp(query, 'i') } },
                { stock: { $gt: 0 } },
            ],
        } : {}

        const options = {
            limit: isNaN(parseInt(limit)) ? 10 : parseInt(limit),
            page: isNaN(parseInt(page)) ? 1 : parseInt(page),
            sort: { price: sort === 'asc' ? 1 : -1 }
        }

        const products = await productService.paginate(filter, options)

        const queryParameters = {};
        if (query) queryParameters.query = query
        if (sort) queryParameters.sort = sort
        if (limit) queryParameters.limit = limit

        const paginateData = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&${new URLSearchParams(queryParameters)}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&${new URLSearchParams(queryParameters)}` : null
        };

        res.send(paginateData)

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The database query could not be performed' });
    }
}

// const getProducts = async (req, res) => {
//     try {
//         let { limit, page, query, sort } = req.query
//         const { baseUrl } = req

//         const filter = query ? {
//             $and: [
//                 { category: { $regex: new RegExp(query, 'i') } },
//                 { stock: { $gt: 0 } },
//             ],
//         } : {}

//         const options = {
//             limit: isNaN(parseInt(limit)) ? 10 : parseInt(limit),
//             page: isNaN(parseInt(page)) ? 1 : parseInt(page),
//             sort: { price: sort === 'asc' ? 1 : -1 }
//         }

//         const products = await productsModel.paginate(filter, options)

//         const queryParameters = {};
//         if( query ) queryParameters.query = query
//         if( sort ) queryParameters.sort = sort
//         if( limit ) queryParameters.limit = limit

//         const paginateData = {
//             status: 'success',
//             payload: products.docs,
//             totalPages: products.totalPages,
//             prevPage: products.prevPage,
//             nextPage: products.nextPage,
//             page: products.page,
//             hasPrevPage: products.hasPrevPage,
//             hasNextPage: products.hasNextPage,
//             prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&${new URLSearchParams(queryParameters)}` : null,
//             nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&${new URLSearchParams(queryParameters)}` : null
//         };

//         if (baseUrl === '/api/products') {
//             res.send(paginateData)
//         } else {
//             const products = paginateData.payload.map(product => product.toObject())
//             const pages = Array.from({ length: paginateData.totalPages }, (v, i) => i + 1);
//             res.render('products', {
//                 pageName: 'Productos Disponibles',
//                 layout: 'main',
//                 products,
//                 pages,
//                 queryParameters
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ status: 'error', error: 'Internal server error. The database query could not be performed' });
//     }
// }

const getProductById = async (req, res) => {

    const { pid } = req.params

    try {
        const product = await productService.getById( pid ).lean()
        if (!product) return res.status(404).send({ error: `Product id: ${pid} not found` })
            res.send(product)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}
// const getProductById = async (req, res) => {
//     const { originalUrl } = req
//     console.log(originalUrl)
//     try {
//         const product = await productsModel.findById(req.params.pid).lean()
//         if (!product) return res.status(404).send({ error: `Product id: ${req.params.pid} not found` })
//         console.log(product)
//         if (originalUrl === `/api/products/${product._id}`) {
//             res.send(product);
//         } else {
//             res.render('productDetail', {
//                 pageName: product.title,
//                 product
//             })
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: 'Internal server error' });
//     }
// }

const addProducts = async (req, res) => {
    try {
        const newProduct = await productService.create(req.body)
        console.log('Desde addProducts', newProduct)
        res.send(newProduct)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// const addProducts = async (req, res) => {
//     console.log(req.body)
//     try {
//         const newProduct = await productsModel.create(req.body)
//         console.log('Desde addProducts', newProduct)
//         res.send(newProduct)
//     } catch (error) {
//         console.log('Desde controller addproduct', error.message)
//         res.status(500).send(error.message);
//     }
// }

const updatedProduct = async (req, res) => {

    const { pid } = req.params

    try {

        const product = await productService.updateById(
            pid,
            { ...req.body },
            { new: true }
        )
        res.send(product)
    } catch (error) {
        console.log(error)
        res.status(404).send({ error });
    }
}
// const updatedProduct = async (req, res) => {
//     try {

//         const product = await productsModel.findByIdAndUpdate(
//             { _id: req.params.pid },
//             { ...req.body },
//             { new: true }
//         )
//         res.send(product)
//     } catch (error) {
//         console.log(error)
//         res.status(404).send({ error });
//     }
// }

const deleteProduct = async (req, res) => {

    const { pid } = req.params

    try {
        const result = await productService.deleteById( pid )
        result.deletedCount > 0
            ? res.status(200).send({ message: `Product id: ${req.params.pid} was successfully deleted` })
            : res.status(404).send({
                error: {
                    message: `Product id: ${req.params.pid} not found!`
                }
            })
    } catch (error) {
        console.log(error.message)
        res.status(404).send({ error });
    }
}

// const deleteProduct = async (req, res) => {
//     try {
//         const result = await productsModel.deleteOne({ _id: req.params.pid })
//         result.deletedCount > 0
//             ? res.status(200).send({ message: `Product id: ${req.params.pid} was successfully deleted` })
//             : res.status(404).send({
//                 error: {
//                     message: `Product id: ${req.params.pid} not found!`
//                 }
//             })
//     } catch (error) {
//         console.log(error.message)
//         res.status(404).send({ error });
//     }
// }

export {
    getProducts,
    getProductById,
    addProducts,
    updatedProduct,
    deleteProduct
}
