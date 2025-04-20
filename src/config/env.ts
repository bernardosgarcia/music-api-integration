import 'dotenv/config';

export const env = {
    INTERNAL_JWT_SECRET: process.env.INTERNAL_JWT_SECRET || '',
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '',
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || ''
};