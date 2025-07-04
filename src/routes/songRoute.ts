import { Router } from 'express';
import { songController } from '../controllers/songController';
// import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/verify-status', songController.getSongStatus);

export default router;