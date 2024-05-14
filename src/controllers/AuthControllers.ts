import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { hashPassword } from '../utils/auth';

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;

            // Prevenir duplicados
            const userExists = await User.findOne({ email });
            if (userExists) {
                const error = new Error('El usuario ya está registrado');
                return res.status(409).json({ error: error.message });
            }

            // Crea un usuario
            const user = new User(req.body);

            // Hash password
            user.password = await hashPassword(password);
            await user.save();

            res.send('Cuenta creada. Revisa tu email para confirmarla');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

}