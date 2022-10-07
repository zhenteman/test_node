import { RedisModule } from 'nestjs-redis';
import { connectOptions } from 'src/config/redis.config';

export default RedisModule.register(connectOptions);
