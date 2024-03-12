import { chatModel } from "./models/Chat.js"

class Chat {

    get = ( params ) => chatModel.find( params )
    
    create = ( doc ) => chatModel.create( doc )

}

const chatService = new Chat()

export default chatService