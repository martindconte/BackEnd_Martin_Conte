import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'El titulo es requerido',
        trim: true
    },
    description: {
        type: String,
        required: 'La descripcion es requerida',
        trim: true
    },
    code: {
        type: String,
        required: 'El codigo del producto es requerido',
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: 'El precio es requerido',
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: 'El stock es requerido',
        trim: true
    },
    category: {
        type: String,
        required: 'La categoria del producto es requerido',
        trim: true
    },
    thumbnails: {
        type: [String],
        trim: true
    },
    owner: {
        type: String,
        default: 'ADMIN'
    }
})

productsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model('products', productsSchema)

export {
    productsModel
}