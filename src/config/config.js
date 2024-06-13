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

const adminUser = {
    username: process.env.APP_ADMIN_EMAIL,
    password: process.env.APP_ADMIN_PASS,
    role: 'ADMIN',
}

export {
    mailing,
    jwtSecret,
    adminUser
}