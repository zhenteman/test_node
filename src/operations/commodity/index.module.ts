import { Module } from '@nestjs/common';
import { CommodityController } from './index.controller';
import { CommodityService } from './index.service';
import { DBCommodityModule } from 'src/database/mongodb/commodity/index.module';

@Module({
    imports: [DBCommodityModule],
    controllers: [CommodityController],
    providers: [CommodityService],
})
export class CommodityModule {}
