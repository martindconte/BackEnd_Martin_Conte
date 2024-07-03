import { userModel } from "../models/Users.js"

export default class UserDao {

    async get( params ) {
        return await userModel.find( params )
    }

    async getById( id ) {
        return await userModel.findOne( id )
    }

    async create( doc ) {
        return await userModel.create( doc )
    }

    async updateById( id, update, options ){
        return await userModel.findByIdAndUpdate( { _id: id }, update, options )
    }

    async deleteById( id ){
        return await userModel.findByIdAndDelete({ _id: id })
    }

    async save( doc ){
        const user = new userModel(doc)
        return await user.save()
    }
}