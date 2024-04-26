import { generateId } from "../helpers/functions.js";
import GenericRepository from "./GenericRepository.js"

export default class TicketRepository extends GenericRepository {
    constructor( dao ) {
        super( dao )
    }

    async generate(email, totalAmount){
        const ticket = await this.dao.create({
            code: generateId(),
            purchase_datetime: new Date().toLocaleString(),
            amount: totalAmount,
            purchaser: email
        })
        return ticket; 
    }
}