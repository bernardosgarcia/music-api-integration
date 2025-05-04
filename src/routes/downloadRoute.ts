import { Router } from 'express';
import { downloadController } from '../controllers/downloadController';

const router = Router();

router.post("/music", downloadController.downloadSong)
router.post("/playlist", downloadController.downloadPlaylist)

export default router