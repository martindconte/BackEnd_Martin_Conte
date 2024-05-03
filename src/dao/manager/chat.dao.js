import { chatModel } from "../models/Chat.js"

export default class Chat {

    async get( params ){
        return await chatModel.find( params )
    }
    
    async create( doc ){
        return await chatModel.create( doc )
    }

}