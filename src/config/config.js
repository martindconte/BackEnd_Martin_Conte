import dotenv from "dotenv";

dotenv.config()

const mailing = {
    service: process.env.MAIL_SERVICE,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_AUTH_USER, 
            pass: process.env.MAIL_AUTH_PASS
        }
}

const jwtSecret = {
    secret: process.env.JWT_SECRET
}

export {
    mailing,
    jwtSecret
}