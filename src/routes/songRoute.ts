import { Router } from 'express';
import { songController } from '../controllers/songController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/verify-status', authenticateToken, songController.getSongStatus);
router.get('/test-song', songController.testProcessSong);

export default router;