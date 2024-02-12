import { productsModel } from "../dao/models/products.models.js";

const getProducts = async (req, res) => {
    try {
        const products = await productsModel.find().limit(req.query.limit)
        res.send(products)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Internal server error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await productsModel.findById(req.params.pid)
        if (!product) return res.status(404).send({ error: `Product id: ${req.params.pid} not found` })
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const addProducts = async (req, res) => {
    console.log(req.body)
    try {
        const newProduct = await productsModel.create(req.body)
        // const msg = '<h1 style="color: red">El producto a sido Agregado a la Lista de Productos </h1>'
        // const products = await productsModel.find()
        console.log('Desde addProduct', newProduct)
        res.send(newProduct)
    } catch (error) {
        console.log('Desde controller addproduct', error.message)
        res.status(500).send( error.message );
    }
}

const updatedProduct = async (req, res) => {
    try {
        
        const product = await productsModel.findByIdAndUpdate(
            { _id: req.params.pid },
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
    try {
        const result  = await productsModel.deleteOne({ _id: req.params.pid })
        result.deletedCount > 0
            ? res.status(200).send({ message: `Product id: ${req.params.pid} was successfully deleted`})
            : res.status(404).send( { error: {
                message: `Product id: ${req.params.pid} not found!`
            }} )
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




// import { ProductManager } from "../models/Products.js"
// import __dirname from "../utils.js";

// const productManager = new ProductManager( __dirname + '/public/data')

// const getProducts = async (req, res) => {
//     try {
//         const products = await productManager.getProducts(req.query.limit)
//         res.json(products)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ error: 'Internal server error' });
//     }
// }

// const getProductById = async (req, res) => {
//     try {
//         const product = await productManager.getProductsById(req.params.pid)
//         if (!product) return res.status(404).send({ error: `Product id: ${req.params.pid} not found` })
//         res.send(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: 'Internal server error' });
//     }
// };

// const addProducts = async (req, res) => {
//     console.log(req.body)
//     try {
//         await productManager.addProduct(req.body)
//         const msg = '<h1 style="color: red">El producto a sido Agregado a la Lista de Productos </h1>'
//         const products = await productManager.getProducts()
//         console.log(products)
//         res.send({ msg, products })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ error });

//     }
// }

// const updatedProduct = async (req, res) => {
//     try {
//         await productManager.updateProduct(req.params.pid, req.body)
//         res.send('<h1 style="color: red">El producto a sido modificado </h1>')
//     } catch (error) {
//         console.log(error)
//         res.status(404).send({ error });
//     }
// }

// const deleteProduct = async (req, res) => {
//     try {
//         console.log('Eliminando...')
//         await productManager.deleteProduct(req.params.pid)
//         const msg = `<h1 style="color: red">Product id ${req.params.id} has been deleted</h1>`
//         const products = await productManager.getProducts()
//         res.send({ msg, products })
//     } catch (error) {
//         console.log(error.message)
//         res.status(404).send({ error });
//     }
// }

// export {
//     getProducts,
//     getProductById,
//     addProducts,
//     updatedProduct,
//     deleteProduct
// }

