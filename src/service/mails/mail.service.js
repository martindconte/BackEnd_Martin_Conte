import nodemailer from 'nodemailer'
import { mailing } from '../../config/config.js'

const transport = nodemailer.createTransport({
    service: mailing.service,
    port: mailing.port,
    auth: mailing.auth
})

class MailingService {
    static async sendPasswordResetMail (user, destination, passwordResetToken) {

        await transport.sendMail({
            from: `e-commerce services <${mailing.auth.user}>`,
            to: destination,
            subject: `Change your Password - eCommerce`,
            html: `
                <div>
                    <h1 style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; text-align: center;">Reset Password - e-Commerce</h1>
                    <h2>Hello ${user.first_name} ${user.last_name}</h2>
                    <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">If you wish to change your password please go to the following link</p>
                    <a href="http://localhost:8080/change-password/${passwordResetToken}"><button style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif);">Change Your Password</button></a>
                    <p style="color: red; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; text-align: center;">If you are not the one who requested the password change, reject this email</p>
                </div>
            `
        })
    }

    static async sendDeletedAccountMail ( user ) {
        await transport.sendMail({
            from: `e-commerce services <${mailing.auth.user}>`,
            to: user.email,
            subject: `Deleted Acount`,
            html: `
                <div>
                    <h1 style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; text-align: center;">Your account has been deleted</h1>
                    <h2>Hello ${user.first_name} ${user.last_name}</h2>
                    <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; text-align: center;">Your account has been deleted due to inactivity. I hope you come back soon</p>
                    <p style="color: red; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; text-align: center;">If you have never registered on the site ignore this email</p>
                </div>
            `
        })
    }


}

export {
    MailingService
}