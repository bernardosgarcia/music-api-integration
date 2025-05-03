import { Router } from 'express';
import { downloadController } from '../controllers/downloadController';

const router = Router();

router.post("/music", downloadController.downloadMusic)
router.post("/playlist", downloadController.downloadMusic)

export default router