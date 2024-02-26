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