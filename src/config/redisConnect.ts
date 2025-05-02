import * as redis from 'redis';
import env from '../config/env';

const client = redis.createClient({
    url: env.REDIS_URL, 
    password: env.REDIS_PASSWORD,
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export const redisConnect = () => {
  client.connect();
  return client;
};

export const getClient = () => {
  return client;
};