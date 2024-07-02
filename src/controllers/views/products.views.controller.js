import { faker } from "@faker-js/faker";
import UserDTO from "../../dao/DTO/user.dto.js";
import { productService } from "../../service/index.service.js";

export const renderProducts = async (req, res) => {

    try {

        let { limit, page, query, sort } = req.query

        const filter = query ? {
            $and: [
                {
                    $or: [
                        { category: { $regex: new RegExp(query, 'i') } },
                        { description: { $regex: new RegExp(query, 'i') } },
                    ]
                },
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
        const baseURL = req.originalUrl
        const pages = Array.from({ length: paginateData.totalPages }, (v, i) => i + 1);
        res.render('products', {
            pageName: 'Productos Disponibles',
            layout: 'main',
            products: productsData,
            pages,
            queryParameters,
            baseURL,
            userDTO: req.session.user,
            notAdmin: true,
            adminPProducts: req.session.user.role === 'PREMIUM' ? true : req.session.user.role === 'ADMIN' ? true: false
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 'error', error: 'Internal server error. The database query could not be performed' });
    }
}

export const renderProductsById = async (req, res) => {
    const { pid } = req.params

    try {
        const product = await productService.getById(pid)
        const plainProducts = product.toObject()
        if (!product) return res.status(404).send({ error: `Product id: ${pid} not found` })
        res.render('productDetail', {
            pageName: product.title,
            product: plainProducts,
            userDTO: req.session.user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

export const renderMockingProducts = async (req, res) => {
    const products = []
    for (let i = 0; i < 10; i++) {
        products.push({
            id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.alphanumeric(10),
            price: faker.commerce.price(),
            status: Math.random() < 0.5,
            stock: faker.number.int({ min: 10, max: 100 }),
            category: faker.commerce.department(),
            thumbnails: faker.image.url(),
        })
    }
    res.send(products)
}