import { cartModel } from "../models/Carts.js"

export default class CartsDao {

    async get( params ) {
        return await cartModel.find( params )
    }
    
    async getById( id ) {
        return await cartModel.findOne( {_id: id} )
    }

    async create( doc ){
        return await cartModel.create( doc )
    }

    async updateById( id, update, options ){
        return await cartModel.findByIdAndUpdate( { _id: id }, update, options )
    }

    async deleteById( id ){
        return await cartModel.deleteOne({ _id: id })
    }

    async aggregate( pipeline ){
        return await cartModel.aggregate( pipeline )
    }
}