import { chatModel } from "./models/Chat.js"

class Chat {

    get = ( params ) => chatModel.find( params )
    
    create = ( doc ) => chatModel.create( doc )

}

const chatService = new Chat()

export default chatService


// import mongoose from "mongoose";

// const chatSchema = new mongoose.Schema({
//     user: {
//         type: String,
//         required: 'Debe ingresar un mail valido',
//         trim: true
//     },
//     message: {
//         type: String,
//         required: 'Debe ingresar un mensaje',
//         trim: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// })

// export const chatModel = mongoose.model('Message', chatSchema )