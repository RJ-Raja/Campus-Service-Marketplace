import Redis from 'ioredis';

let redis: Redis | null = null;

const initializeRedis = (): Redis => {
  try {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      throw new Error('REDIS_URL is not defined in environment variables');
    }

    redis = new Redis(redisUrl);

    redis.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redis.on('error', (error) => {
      console.error('❌ Redis error:', error);
    });

    return redis;
  } catch (error) {
    console.error('❌ Redis initialization error:', error);
    process.exit(1);
  }
};

const getRedisClient = (): Redis => {
  if (!redis) {
    throw new Error('Redis client not initialized. Call initializeRedis() first.');
  }
  return redis;
};

export { initializeRedis, getRedisClient };
