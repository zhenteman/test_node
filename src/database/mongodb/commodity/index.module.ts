import { DBClassifyModule } from './../classify/index.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBCommodityService } from './index.service';
import { CommoditySchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'commodity', schema: CommoditySchema },
        ]),
        DBClassifyModule,
    ],
    providers: [DBCommodityService],
    exports: [DBCommodityService],
})
export class DBCommodityModule {}
