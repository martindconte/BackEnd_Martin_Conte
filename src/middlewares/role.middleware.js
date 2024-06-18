import CustomError from "../service/errors/CustomError.js"
import ErrorType from "../service/errors/ErrorType.js"
import { getUserErrorRole } from "../service/errors/info.js"

export const checkRole = ( role ) => ( req, res, next ) => {

    const { user } = req.session

    console.log('user --------------------------->', user);
    
    if(!Array.isArray(role)) {
        role = [ role ]
    }

    // if( user.role != role ){
    if( !role.includes(user.role) ){
        const customError =  new CustomError({
            name: `Unauthorized. You are not a ${user.role}`,
            cause: getUserErrorRole(user.role),
            message: `Unauthorized. Your user role ${user.role} does not have permissions`,
            code: ErrorType.AUTHORIZATION_ERROR,
        })
        console.log('customError ------------------------------------------>', {customError});
        // res.status(404).send(`Unauthorized. Your user role ${user.role} does not have permissions`)
        res.redirect('/products')
        next(customError)
        // return res.status(403).send({ status: 'errro', error: `Unauthorized. You are not a ${role}` })
    }
    next()
}