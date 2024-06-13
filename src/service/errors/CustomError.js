import ErrorType from "./ErrorType.js";

export default class CustomError extends Error {
    constructor({ name = 'Error', cause, message, status = 400, code = ErrorType.UNKOWN }){
        super(message)
        this.name = name,
        this.cause = cause,
        this.code = code
        this.status = status
    }
}