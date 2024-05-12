import express from "express"

const router = express.Router()

router.get( '/', (req, res) => {
    req.logger.fatal('this is fatal error')
    req.logger.error('this is error')
    req.logger.warn('this is warn')
    req.logger.info('this is info')
    req.logger.http('this is http')
    req.logger.debug('this is debug')

    res.send({  status: 'succes', message: 'Logger test' })
})

export default router