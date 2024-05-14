import { transporter } from "../config/nodemailer";

interface IEMail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEMail) => {
        await transporter.sendMail({
            from: 'Uptask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Confirma tu cuenta',
            text: 'Uptask - Confirma tu cuenta',
            html: `<p>Hola: ${user.name} - Has creado tu cuenta en Uptask. Solo debes confirmar tu cuenta para finalizar</p>
            <p>Visita el siguiente enlace</p>
            <a hre="">Confirmar cuenta</a>
            <p>E ingresa el código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `
        });
    }
}