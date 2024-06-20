import CustomError from "../service/errors/CustomError.js"
import ErrorType from "../service/errors/ErrorType.js"
import { getUserErrorRole } from "../service/errors/info.js"

export const checkRole = ( role ) => ( req, res, next ) => {

    const { user } = req.session
    
    if(!Array.isArray(role)) {
        role = [ role ]
    }

    if( !role.includes(user.role) ){
        const customError =  new CustomError({
            name: `Unauthorized. You are not a ${user.role}`,
            cause: getUserErrorRole(user.role),
            message: `Unauthorized. Your user role ${user.role} does not have permissions`,
            code: ErrorType.AUTHORIZATION_ERROR,
        })
        res.redirect('/products')
        next(customError)
    }
    next()
}