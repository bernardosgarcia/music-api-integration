import axios from 'axios';
import { env } from '../config/env';
var querystring = require('querystring');

export class AuthService {
    async getTokenByCode(code: string) {
        try {
            return await axios.post(
              'https://accounts.spotify.com/api/token',
              querystring.stringify({
                code: code as string,
                redirect_uri: env.SPOTIFY_REDIRECT_URI,
                grant_type: 'authorization_code'
              }),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Authorization:
                    'Basic ' +
                    Buffer.from(
                      env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET
                    ).toString('base64')
                }
              }
            );
        } catch(error) {
            console.error('Error to obtain Spotify token:', error);
            return 'invalid_token';
        }
    }
}

export const authService = new AuthService();
