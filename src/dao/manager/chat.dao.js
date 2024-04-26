import { chatModel } from "../models/Chat.js"

export default class Chat {

    // get = ( params ) => chatModel.find( params )
    async get( params ){
        return await chatModel.find( params )
    }
    
    // create = ( doc ) => chatModel.create( doc )
    async create( doc ){
        return await chatModel.create( doc )
    }

}