export const checkRole = ( role ) => ( req, res, next ) => {

    console.log(req.session)
    const { user } = req.session

    if( user.role != role ){
        return res.status(403).send({ status: 'errro', error: `Unauthorized. You are not a ${role}` })
    }

    next()
}