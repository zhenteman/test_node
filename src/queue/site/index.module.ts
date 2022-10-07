import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SiteProcessor } from './index.processor';
import { SiteQueueService } from './index.service';
import { DBRedisModule } from 'src/database/redis/index/index.module';

@Module({
    imports: [
        DBRedisModule,
        BullModule.registerQueue({
            name: 'site',
        }),
    ],
    providers: [SiteProcessor, SiteQueueService],
    exports: [SiteQueueService],
})
export class SiteQueueModule {}
