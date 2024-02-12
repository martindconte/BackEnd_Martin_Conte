import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: 'Debe ingresar un mail valido',
        trim: true
    },
    message: {
        type: String,
        required: 'Debe ingresar un mensaje',
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const chatModel = mongoose.model('Message', chatSchema )