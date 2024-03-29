import { userModel } from "./models/Users.js"

class User {

    get = ( params ) => userModel.find( params )

    getOne = ( params ) => userModel.findOne( params )
    
    getByEmail = ( email ) => userModel.findOne({ email })

    create = ( doc ) => userModel.create( doc )
}

const userService = new User()

export default userService