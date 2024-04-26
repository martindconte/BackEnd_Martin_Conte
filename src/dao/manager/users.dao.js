import { userModel } from "../models/Users.js"

export default class UserDao {

    get = ( params ) => userModel.find( params )
    async get( params ) {
        return await userModel.find( params )
    }

    async getById( id ) {
        return await userModel.findOne( id )
    }

    async create( doc ) {
        return await userModel.create( doc )
    }
}