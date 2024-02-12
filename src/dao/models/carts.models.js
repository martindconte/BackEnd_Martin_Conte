import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products'
                },
                quantity: {
                    type: Number,
                    min: 0
                }
            }],
        default: []
    }
})

cartSchema.pre('find', function () {
    this.populate('products.product')
})

export const cartModel = mongoose.model('Carts', cartSchema)