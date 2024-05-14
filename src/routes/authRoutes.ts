import { Router } from "express";
import { AuthController } from "../controllers/AuthControllers";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe contar con mínimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.createAccount
);

export default router;