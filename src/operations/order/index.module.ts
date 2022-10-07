import { DBClassifyModule } from './../../database/mongodb/classify/index.module';
import { DBCommodityModule } from 'src/database/mongodb/commodity/index.module';
import { Module } from '@nestjs/common';
import { OrderController } from './index.controller';
import { OrderService } from './index.service';
import { DBOrderModule } from 'src/database/mongodb/order/index.module';
import { SiteQueueModule } from 'src/queue/site/index.module';

@Module({
    imports: [
        DBOrderModule,
        DBCommodityModule,
        DBClassifyModule,
        SiteQueueModule,
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
