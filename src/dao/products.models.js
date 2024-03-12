import { productsModel } from './models/Products.js'

class Products {

    get = ( params ) => productsModel.find( params )
    
    getById = ( id ) => productsModel.findOne( {_id: id} )

    create = ( doc ) => productsModel.create( doc )
    
    updateById = ( id, update, options ) => productsModel.findByIdAndUpdate( id, update, options )
    
    deleteById = ( id ) => productsModel.deleteOne({ _id: id })

    paginate = ( filter, options ) => productsModel.paginate( filter, options )
}

const productService = new Products()

export default productService