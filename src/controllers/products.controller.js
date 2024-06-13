import CustomError from "../service/errors/CustomError.js";
import ErrorType from "../service/errors/ErrorType.js";
import { getProductErrorCode } from "../service/errors/info.js";
import { productService } from "../service/index.service.js";

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
        const product = await productService.getById( pid )
        if (!product) return res.status(404).send({ error: `Product id: ${pid} not found` })
            res.send(product)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

const addProducts = async (req, res, next) => {

    const { user } = req.session;
    const { code } = req.body
    
    if(user.role == 'PREMIUM') {
        req.body.owner = user.username
    }
    
    try {
        const isDuplicated = await productService.get({ code })

        if( isDuplicated.length > 0 ) {
            return res.status(404).send(`The code ${req.body.code} is already registered!`)
        }

        const newProduct = await productService.create(req.body)
        res.send(newProduct)
    } catch (error) {
        console.log(error.message)
        const customError = new CustomError({
            name: `The code ${req.body.code} is already registered!`,
            cause: getProductErrorCode( req.body.code ),
            message: 'Error creating Product. Check Code...',
            code: ErrorType.INVALID_DATA
        })
        res.status(400).send(`The code ${req.body.code} is already registered!`)
        next(customError)
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
    console.log('el pid es ---------------->', pid);
    const { user } = req.session

    try {

        const product = await productService.getById( pid )

        if( user.role == 'PREMIUM' && product.owner != user.username) {
            throw new Error(`Can't delete item. The product belong to the user: ${product.owner}`)
        }

        const result = await productService.deleteById( pid )
        result.deletedCount > 0
            ? res.status(200).send({ message: `Product id: ${req.params.pid} was successfully deleted` })
            : res.status(404).send({
                error: {
                    message: `Product id: ${req.params.pid} not found!`
                }
            })
    } catch (error) {
        console.log(error)
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
