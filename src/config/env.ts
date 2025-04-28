import 'dotenv/config';

export const env = {
    INTERNAL_JWT_SECRET: process.env.INTERNAL_JWT_SECRET || '',
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '',
    SPOTIFY_SCOPE: process.env.SPOTIFY_SCOPE || '',
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || '',
    CLIENT_URI: process.env.CLIENT_URI || 'http://127.0.0.1:3000',
    REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
};