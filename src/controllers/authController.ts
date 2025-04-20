import { Request, Response } from 'express';
import { generateRandomString } from '../utils/randomString';
import { env } from '../config/env';
import { authService } from '../services/authService';
var querystring = require('querystring');

export const loginWithSpotify = (req: Request, res: Response) => {
  var state = generateRandomString(16);
  res.cookie('spotify_auth_state', state);

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: env.SPOTIFY_REDIRECT_URI,
      state: state
    }));
};

export const callbackSpotify = async (req: Request, res: Response) => {
  const { code, state } = req.query;

  if (!state) {
    return res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    );
  }

  const response = await authService.getTokenByCode(code as string);

  if (response == 'invalid_token') {
    return res.redirect(
      '/#' +
        querystring.stringify({
          error: response
        })
    );
  }

  res.json(response.data);
};