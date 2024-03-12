import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    min: 0
                }
            }
        ],
        default: []
    }
})

cartSchema.pre('findOne', function (next) {
    this.populate('products.product')
    next()
})
cartSchema.pre('find', function (next) {
    this.populate('products.product')
    next()
})

const cartModel = mongoose.model('carts', cartSchema)

export {
    cartModel
}