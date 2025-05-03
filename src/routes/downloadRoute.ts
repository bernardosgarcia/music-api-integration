import { Router } from 'express';
import { downloadController } from '../controllers/downloadController';

const router = Router();

router.post("/url", downloadController.downloadMusic)

export default router