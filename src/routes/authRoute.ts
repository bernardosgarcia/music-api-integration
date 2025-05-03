// import { Router } from 'express';
// import { authController } from '../controllers/authController';

// const router = Router();

// /**
//  * @swagger
//  * /api/auth/login:
//  *   get:
//  *     summary: Realizar login com Spotify
//  *     responses:
//  *       204:
//  *         description: Success no content
//  */
// router.get('/login', authController.loginWithSpotify);
// router.get('/callback', authController.callbackSpotify);

// /**
//  * @swagger
//  * /api/auth/get-token-by-cache:
//  *   get:
//  *     summary: Recuperar token de acesso pelo cache
//  *     parameters:
//  *       - in: query
//  *         name: sessionId
//  *         schema:
//  *           type: string
//  *         required: true
//  *     responses:
//  *       200:
//  *         description: Success
//  *       400:
//  *         description: Mising sessionId
//  */
// router.get('/get-token-by-cache', authController.getTokenByCache);

// export default router;