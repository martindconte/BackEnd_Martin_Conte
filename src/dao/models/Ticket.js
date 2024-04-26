import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    purchase_datetime: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        equired: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

export const ticketModel = mongoose.model('tickets', ticketSchema);

