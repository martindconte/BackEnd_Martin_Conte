import { ticketModel } from "../models/Ticket.js"

export default class TicketDao {

    async get( params ) {
        return await ticketModel.find( params )
    }
    
    async getById( id ) {
        return await ticketModel.findOne( {_id: id} )
    }

    async create( doc ){
        return await ticketModel.create( doc )
    }

    async updateById( id, update, options ){
        return await ticketModel.findByIdAndUpdate( { _id: id }, update, options )
    }

    async deleteById( id ){
        return await ticketModel.deleteOne({ _id: id })
    }

    async aggregate( pipeline ){
        return await ticketModel.aggregate( pipeline )
    }
}