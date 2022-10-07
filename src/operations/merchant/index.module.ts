import { DBCommodityModule } from 'src/database/mongodb/commodity/index.module';
import { DBClassifyModule } from './../../database/mongodb/classify/index.module';
import { DBMerchantModule } from 'src/database/mongodb/merchant/index.module';
import { Module } from '@nestjs/common';
import { MerchantController } from './index.controller';
import { MerchantService } from './index.service';

@Module({
    imports: [DBMerchantModule, DBClassifyModule, DBCommodityModule],
    controllers: [MerchantController],
    providers: [MerchantService],
})
export class MerchantModule {}
