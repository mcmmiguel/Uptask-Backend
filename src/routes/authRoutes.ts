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

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El token no puede estar vacío'),
    handleInputErrors,
    AuthController.confirmAccount,
);

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El token no puede estar vacío'),
    handleInputErrors,
    AuthController.confirmAccount,
);

router.post('/login',
    body('email')
        .notEmpty().withMessage('E-mail no válido'),
    body('password')
        .notEmpty().withMessage('La contraseña no debe estar vacía'),
    handleInputErrors,
    AuthController.login,
);

router.post('/request-code',
    body('email')
        .notEmpty().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.requestConfirmationCode,
);

export default router;