import 'dotenv/config';

const env = {
    INTERNAL_JWT_SECRET: process.env.INTERNAL_JWT_SECRET || '',

    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '',
    SPOTIFY_SCOPE: process.env.SPOTIFY_SCOPE || '',
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || '',

    MONGODB_USERNAME: process.env.MONGODB_USERNAME || '',
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || '',
    MONGODB_APPNAME: process.env.MONGODB_APPNAME || '',
    MONGODB_CLUSTERNAME: process.env.MONGODB_CLUSTERNAME || '',

    CLIENT_URI: process.env.CLIENT_URI || 'http://127.0.0.1:3000',

    REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',

    MUSIC_AI_API_KEY: process.env.MUSIC_AI_API_KEY || '',
};

export default env;