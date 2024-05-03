import ErrorType from "../service/errors/ErrorType.js";

const errorHandling = (error, req, res, next)=>{

    console.log(error)
    switch (error.code) {
        case ErrorType.ROUTING_ERROR:
            res.status(404).send({status:'error', error: error.name})
            break;
        case ErrorType.INCOMPLETE_DATA:
            res.status(400).send({status:'error', error: error.name})
            break;
        case ErrorType.DATABASE_ERROR:
            res.status(500).send({status:'error', error: error.name})
            break;
        case ErrorType.AUTHORIZATION_ERROR:
            res.status(500).send({status:'error', error: error.name})
            break;
        default:
            res.status(500).send({status:'error', error: 'Unhadled error'})
            break;
    } 
}

export default errorHandling
