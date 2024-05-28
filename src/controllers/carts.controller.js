// import cartService from "../dao/carts.models.js"
// import productService from "../dao/products.models.js"
import { cartService, productService, ticketService } from '../service/index.service.js'

const getAllCarts = async (req, res) => {
    try {
        const carts = await cartService.get()
        res.send(carts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: 'Internal server error... Could not retrieve shopping cart data.' })
    }
}

const createNewCart = async (req, res) => {
    try {
        const newCart = await cartService.create()
        res.status(200).send({ status: "Cart created!", newCart });
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Internal server error - Cart not created' })
    }
}

const getCartById = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartService.getById(cid)
        res.send(cart)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: 'Internal server error... Could not retrieve shopping cart data.' })
    }
}

const addProductsToCart = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const { user } = req.session;

        const cart = await cartService.getById(cid)
        const product = await productService.getById(pid)

        if( user.role == 'PREMIUM' && product.owner == user.username) {
            throw new Error("Can't add product. The product belong to you")
        }

        if (!cart || !product) res.status(404).send({ error: 'There are no products or carts created with those ids. Create a new cart or verify the id' })

        const productExist = cart.products.some(item => item.product && item.product.equals(pid))

        if (productExist) {
            const cartProductIndex = cart.products.findIndex(item => item.product && item.product.equals(pid))
            cart.products[cartProductIndex].quantity++
        } else {
            cart.products.push({
                product: product._id,
                quantity: 1,
            })
        }

        await cartService.updateById(cid, cart, { returnNewDocument: true })
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

    try {
        const cart = await cartService.getById(cid)
        const products = await productService.get()

        const isValid = newProducts.every(item => {
            return products.some(product => product.equals(item.product))
        })

        isValid
            ? cart.products = newProducts
            : res.status(404).send({ error: 'Try entering an invalid id. Review the information you intend to upload' })

        await cartService.updateById(cid, cart, { new: true })
        res.send(cart)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateQuantity = async (req, res) => {
    console.log('Modificando la cantidad de Productos que hay en un carrito... el body sera la cantidad de productos')
    const { quantity: newQuantity } = req.body

    if( newQuantity < 0 ) return res.status(404).json({ error: 'The quantity cannot be less than zero' })

    const { cid, pid } = req.params

    try {
        const cart = await cartService.getById( cid )

        const productIndex = cart.products.findIndex(item => item.product.equals(pid))

        if (productIndex !== -1) {
            cart.products[productIndex].quantity = newQuantity
        } else {
            res.status(404).json({ error: 'Error finding the product in the shopping cart' })
        }

        await cartService.updateById( cid, cart, { returnNewDocument: true } )
        res.status(200).json({ cart })

    } catch (error) {
        res.status(500).json({ error: 'Error when modifying the quantity of products' })
    }
}

const deleteProductInCart = async (req, res) => {

    try {

        const { cid, pid } = req.params;
        const cart = await cartService.getById(cid)

        if (!cart) res.status(404).json({ error: 'Cart not found...' })

        const productIndex = cart.products.findIndex(item => item.product && item.product.equals(pid))
        if (productIndex === -1) return res.status(404).json({ error: 'Product  not found in Cart!' })
        cart.products.splice(productIndex, 1)

        await cartService.updateById( cid, cart, { returnNewDocument: true } )
        res.status(200).json({ cart })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting a product' })
    }
}

const deleteAllProductsInCart = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartService.updateById(
            cid,
            { $set: { products: [] } },
            { new: true }
        );

        if (!cart) return res.status(404).send({ error: 'The products could not be deleted. Check the information' });

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error when trying to delete products' });
    }
}

const purchaseCart = async ( req, res ) => {
    const { cid } = req.params
    const { user } = req.session

    try {
        const cart = await cartService.getById( cid )
        let notPurchaseProducts = []
        let purchaseProducts = []
        let totalAmount = 0
        for( let i = 0 ; i < cart.products.length ; i++ ) {
            const item = cart.products[i]
            const remainder = item.product.stock - item.quantity
            if( remainder >= 0 ){
                await productService.updateById( item.product._id, { ...item.product.toObject(), stock: remainder }, {} )
                purchaseProducts.push(item.toObject())
                totalAmount += item.quantity * item.product.price
            } else {
                notPurchaseProducts.push(item.product)
            }
        }
        if( purchaseProducts.length > 0 ) {
            cart.products = notPurchaseProducts
            await cartService.updateById(cid, cart, {})
            const ticket = await ticketService.generate( user.username, totalAmount )
            return res.send({notPurchaseProducts, purchaseProducts, ticket})
        } else {
            return res.send({msg: 'No se a podido realizar la compra. NO HAY STOCK DE NINGUN PRODUCTO'})
        }
    } catch (error) {
        console.log(error)
    }

}



export {
    createNewCart,
    getCartById,
    addProductsToCart,
    deleteProductInCart,
    updateQuantity,
    deleteAllProductsInCart,
    updateProductsInCart,
    getAllCarts,
    purchaseCart
}
