import productService from "../dao/products.models.js";

const getProducts = async (req, res) => {

    try {

        let { limit, page, query, sort } = req.query

        const filter = query ? {
            $and: [
              { $or: [
                { category: { $regex: new RegExp(query, 'i') } },
                { description: { $regex: new RegExp(query, 'i') } },
              ]},
              { stock: { $gt: 0 } },
            ],
          } : {};

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

const addProducts = async (req, res) => {
    try {
        const newProduct = await productService.create(req.body)
        console.log('Desde addProducts', newProduct)
        res.send(newProduct)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

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

export {
    getProducts,
    getProductById,
    addProducts,
    updatedProduct,
    deleteProduct
}
