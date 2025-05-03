// import { Request, Response } from 'express';
// import generateRandomString from '../utils/randomString';
// import { env } from '../config/env';
// import { authService } from '../services/authService';
// import cacheService from '../services/cacheService';
// import { AuthResponse } from '../dtos/authResponse';
// var querystring = require('querystring');

// export class AuthController {
//   loginWithSpotify(req: Request, res: Response)
//   {
//     var state = generateRandomString(16);
//     res.cookie('spotify_auth_state', state);
  
//     res.redirect('https://accounts.spotify.com/authorize?' +
//       querystring.stringify({
//         response_type: 'code',
//         client_id: env.SPOTIFY_CLIENT_ID,
//         scope: env.SPOTIFY_SCOPE,
//         redirect_uri: env.SPOTIFY_REDIRECT_URI,
//         state: state
//       }));
//   };

//   async callbackSpotify(req: Request, res: Response) 
//   {
//     const { code, state } = req.query;
//     if (!state) {
//       return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
//     }
  
//     const spotifyTokenInfo = await authService.getSpotifyTokenByCode(code as string);
//     const internalTokenInfo = authService.getInternalToken();

//     const sessionId = generateRandomString(16);

//     await cacheService.set('spotify-token-' + sessionId, spotifyTokenInfo);
//     await cacheService.set('internal-token-' + sessionId, internalTokenInfo);
  
//     res.redirect(env.CLIENT_URI + '/?sessionId=' + sessionId);
//   };

//   async getTokenByCache(req: Request, res: Response) {
//     const sessionId = req.query.sessionId as string;

//     if (!sessionId) {
//       return res.status(400).json({ error: 'Missing sessionId' });
//     }

//     const spotifyTokenInfo = await cacheService.get('spotify-token-' + sessionId);
//     const internalTokenInfo = await cacheService.get('internal-token-' + sessionId);

//     const authResponse: AuthResponse = {
//       spotifyTokenInfo: spotifyTokenInfo,
//       internalTokenInfo: internalTokenInfo
//     };

//     res.json(authResponse);
//   }
// }

// export const authController = new AuthController();