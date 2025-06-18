import { Router } from 'express';
import { downloadController } from '../controllers/downloadController';

const router = Router();

/**
 * @swagger
 * /api/download/song:
 *   post:
 *     summary: Realizar download da Música
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               song:
 *                 type: string
 *               author:
 *                 type: string
 *             required:
 *               - song
 *               - author
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Missing Download Song
 */
router.post("/song", downloadController.downloadSong)

/**
 * @swagger
 * /api/download/playlist:
 *   post:
 *     summary: Realizar download da Playlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 song:
 *                   type: string
 *                 author:
 *                   type: string
 *               required:
 *                 - song
 *                 - author
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Missing Download Playlist
 */
router.post("/playlist", downloadController.downloadPlaylist)

export default router