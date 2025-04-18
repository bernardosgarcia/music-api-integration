import { Router } from 'express';
import { getAuth } from '../controllers/authController';

const router = Router();

router.get('/auth', getAuth);

export default router;