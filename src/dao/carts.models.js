import { cartModel } from './models/Carts.js'

class Carts {

    get = ( params ) => cartModel.find( params )
    
    getById = ( id ) => cartModel.findOne( {_id: id} )

    create = ( doc ) => cartModel.create( doc )
    
    updateById = ( id, update, options ) => cartModel.findByIdAndUpdate( { _id: id }, update, options ) 
    
    deleteById = ( id ) => productsModel.deleteOne({ _id: id })

    aggregate = ( pipeline ) => cartModel.aggregate( pipeline )
}

const cartService = new Carts()

export default cartService

// import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema({
//     products: {
//         type: [{
//                 product: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'products'
//                 },
//                 quantity: {
//                     type: Number,
//                     min: 0
//                 }
//             }],
//         default: []
//     }
// })

// cartSchema.pre('findOne', function (next) {
//     this.populate('products.product')
//     next()
// })
// cartSchema.pre('find', function (next) {
//     this.populate('products.product')
//     next()
// })

// export const cartModel = mongoose.model('carts', cartSchema)