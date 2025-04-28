import { Request, Response } from 'express';
import { generateRandomString } from '../utils/randomString';
import { env } from '../config/env';
import { authService } from '../services/authService';
import { AuthResponse } from '../dtos/authResponse';
var querystring = require('querystring');

export class AuthController {

  loginWithSpotify(req: Request, res: Response)
  {
    var state = generateRandomString(16);
    res.cookie('spotify_auth_state', state);
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: env.SPOTIFY_CLIENT_ID,
        scope: env.SPOTIFY_SCOPE,
        redirect_uri: env.SPOTIFY_REDIRECT_URI,
        state: state
      }));
  };

  async callbackSpotify(req: Request, res: Response) 
  {
    const { code, state } = req.query;
    if (!state) {
      return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
    }
  
    const spotifyAccessToken = await authService.getSpotifyTokenByCode(code as string);
    const internalAccessToken = authService.getInternalToken();
    const authResponse = new AuthResponse(spotifyAccessToken, internalAccessToken);

    res.json(authResponse);
  };

}

export const authController = new AuthController();