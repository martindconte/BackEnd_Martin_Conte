const ioMiddleware = (req, res, next) => {
    req.io = io
    next()
}

export {
    ioMiddleware
}