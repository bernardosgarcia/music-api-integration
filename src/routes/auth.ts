import { Router } from 'express';
import { loginWithSpotify, callbackSpotify } from '../controllers/authController';

const router = Router();

router.get('/auth/login', loginWithSpotify);
router.get('/auth/callback', callbackSpotify)

export default router;