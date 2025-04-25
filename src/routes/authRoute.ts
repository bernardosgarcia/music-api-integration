import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router();

router.get('/login', authController.loginWithSpotify);
router.get('/callback', authController.callbackSpotify);

export default router;