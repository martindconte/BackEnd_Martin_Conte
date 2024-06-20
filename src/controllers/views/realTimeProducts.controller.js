import { productService } from "../../service/index.service.js";

export const getProductsRealTime = async (req, res ) => {
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
          } : { stock: { $gt: 0 } };

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
        const productsData = paginateData.payload.map(product => product.toObject())
        console.log({productsData});
        const pages = Array.from({ length: paginateData.totalPages }, (v, i) => i + 1);
        const baseURL = req.originalUrl
        res.render('realTimeProducts', {
            pageName: 'Productos Disponibles Admin',
            layout: 'main',
            products: productsData,
            pages,
            queryParameters,
            baseURL,
            userDTO: req.session.user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The database query could not be performed' });
    }
}