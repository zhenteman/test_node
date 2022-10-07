import { Module } from '@nestjs/common';
import RedisModule from 'src/modules/plugins/redis.module';
import { DBRedisService } from './index.service';

@Module({
    imports: [RedisModule],
    providers: [DBRedisService],
    exports: [DBRedisService],
})
export class DBRedisModule {}
