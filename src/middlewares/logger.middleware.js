import { devLogger, prodLogger } from "../utils/logger.js"

const addLogger = ( req, res, next ) => {
    console.log('aqui primero...........................................')
    if( process.env.NODE_ENV === 'production' ) {
        req.logger = prodLogger
    }

    if( process.env.NODE_ENV === 'developmennt') {
        req.logger = devLogger
    }

    req.logger.info(`NODE_ENV: ${process.env.NODE_ENV}`)
    req.logger.http(`${req.method} to ${req.url} - ${new Date().toLocaleString()}`)

    next()
}

export default addLogger