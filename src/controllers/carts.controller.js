import { cartModel } from "../dao/models/carts.models.js";
import { productsModel } from "../dao/models/products.models.js";

const createNewCart = async (req, res) => {
    try {
        const newCart = await cartModel.create({})
        res.status(200).send({ status: "Cart created!", newCart });
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: 'Internal server error - Cart not created' })
    }
}

const getCartById = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findById(cid)
        res.send(cart)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: 'Internal server error... Could not retrieve shopping cart data.' })
    }
}

const addProductsToCart = async (req, res) => {
    try {
        const { pid, cid } = req.params

        const cart = await cartModel.findById(cid)
        const product = await productsModel.findById(pid)

        if (!cart || !product) res.status(404).send({ error: 'There are no products or carts created with those ids. Create a new cart or verify the id' })

        const productExist = cart.products.some(item => item.product.equals(pid))

        if (productExist) {
            const cartProductIndex = cart.products.findIndex(item => item.product.equals(pid))
            cart.products[cartProductIndex].quantity++
        } else {
            cart.products.push({
                product: product._id,
                quantity: 1,
            })
        }

        await cartModel.updateOne({ _id: cid }, cart, { returnNewDocument: true })
        res.json(cart)
    } catch (error) {
        console.error(error)
        res.status(404).send(error.message)
    }
}

const updateProductsInCart = async (req, res) => {
    console.log('recibe via body todo el arreglo que productos que queres actualizar... reemplaza al actual arreglo de productos. el nuevo arreglo llega en el body')

    const { cid } = req.params

    const { products: newProducts } = req.body

    console.log('products desde body...', newProducts)
    try {
        const cart = await cartModel.findById( cid )
    const products = await productsModel.find()

    const isValid = newProducts.every(item => {
        return products.some(product => product.equals( item.product ))
    })

    isValid
        ? cart.products = newProducts
        : res.status(404).send( { error: 'Try entering an invalid id. Review the information you intend to upload' } )

    await cart.save()
    res.send({ cart })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateQuantity = async (req, res) => {
    console.log('Modificando la cantidad de Productos que hay en un carrito... el body sera la cantidad de productos')
    const { quantity: newQuantity } = req.body
    console.log(newQuantity)
    const { cid, pid } = req.params
    
    try {
        const cart = await cartModel.findById( cid )

        const productIndex = cart.products.findIndex(item => item.product.equals(pid))

        console.log(productIndex)

        if(productIndex !== -1) {
            cart.products[productIndex].quantity = newQuantity
        } else {
            res.status(404).json({ error: 'Error finding the product in the shopping cart' })
        }

        await cart.save()
        res.status(200).json({ cart })

    } catch (error) {
        res.status(500).json({ error: 'Error when modifying the quantity of products' })
    }    
}

const deleteProductInCart = async (req, res) => {
    console.log('Eliminndo un producto del carrito de compras...')
    try {

        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid)

        if (!cart) res.status(404).json({ error: 'Cart not found...' })

        const productIndex = cart.products.findIndex(item => item.product.equals(pid))
        if (productIndex === -1) return res.status(404).json({ error: 'Product  not found in Cart!' })
        cart.products.splice(productIndex, 1)

        await cart.save()
        res.status(200).json({ cart })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting a product' })
    }
}

const deleteAllProductsInCart = async (req, res) => {
    console.log('Vaciando el carrito...')
    const { cid } = req.params 
    try {
        const cart = await cartModel.findById( cid )
        cart.products =  []
        await cart.save()
        res.status(200).json({ cart })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al eliminar el producto del carrito' })
    }
}

export {
    createNewCart,
    getCartById,
    addProductsToCart,
    deleteProductInCart,
    updateQuantity,
    deleteAllProductsInCart,
    updateProductsInCart
}
