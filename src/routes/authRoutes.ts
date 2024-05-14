import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Hola Auth')
});

export default router;