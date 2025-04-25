import axios from 'axios';
import { env } from '../config/env';
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

            return response.data.access_token;
        } catch(error) {
            console.error('Failed to obtain Spotify token:', error);
            throw new Error('Failed to generate Spotify token');
        }
    };

    getInternalToken() {
        try {
            const payload = {
                iss: 'music-api-integration',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // Token expires in 1 hour
            };

            const token = jwt.sign(payload, env.INTERNAL_JWT_SECRET);
            return token;
        } catch (error) {
            console.error('Error generating internal token:', error);
            throw new Error('Failed to generate internal token');
        }
    }
}

export const authService = new AuthService();
