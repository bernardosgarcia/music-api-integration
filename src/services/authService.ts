import axios from 'axios';
import env from '../config/env';
import { TokenInfo } from '../dtos/authResponse';
import getDateTimeInSeconds from '../utils/dateTimeInSeconds';
import jwt from 'jsonwebtoken';
var querystring = require('querystring');

export class AuthService {
    async getSpotifyTokenByCode(code: string) 
    {
        try {
            var response = await axios.post(
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

            const issuedAt = getDateTimeInSeconds();
            const expireAt = issuedAt + (response.data.expires_in);

            return new TokenInfo(response.data.access_token, expireAt, response.data.refresh_token);
        } catch(error) {
            console.error('Failed to obtain Spotify token:', error);
            throw new Error('Failed to generate Spotify token');
        }
    };

    getInternalToken() {
        try {
          const issuedAt = getDateTimeInSeconds();
          const expireIn = issuedAt + (3600);

          const payload = {
              iss: 'music-api-integration',
              iat: issuedAt,
              exp: expireIn,
          };

          const token = jwt.sign(payload, env.INTERNAL_JWT_SECRET);

          return new TokenInfo(token, expireIn);
        } catch (error) {
            console.error('Error generating internal token:', error);
            throw new Error('Failed to generate internal token');
        }
    }
}

export const authService = new AuthService();
