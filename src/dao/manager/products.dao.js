import { productsModel } from "../models/Products.js"

export default class ProductsDao {

    async get( params ){
        return await productsModel.find( params )
    }

    async getById( id ){
        return await productsModel.findOne( {_id: id} )
    }

    async create( doc ){
        return await productsModel.create( doc )
    }

    async updateById( id, update, options ){
        return await productsModel.findByIdAndUpdate( id, update, options )
    }

    async deleteById( id ){
        return await productsModel.deleteOne( { _id: id } )
    }

    async paginate( filter, options ){
        return await productsModel.paginate( filter, options )
    }
}