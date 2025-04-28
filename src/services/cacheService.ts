import { RedisClientType } from "redis";
import { getClient } from "../config/redisConnect";

class CacheService {
    private client: RedisClientType;

    constructor(client: RedisClientType) {
        this.client = client;
    }

    async get(key: string): Promise<any> {
        try {
            const value = await this.client.get(key);
            if (value) {
                return JSON.parse(value);
            }
            return null;
        } catch (error) {
            console.error('Error retrieving value from cache:', error);
            return null;
        }
    }

    async set(key: string, value: any): Promise<void> {
        try {
            await this.client.set(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting value in cache:', error);
        }
    }

    async delete(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error('Error deleting value from cache:', error);
        }
    }
}

export default new CacheService(getClient() as RedisClientType);