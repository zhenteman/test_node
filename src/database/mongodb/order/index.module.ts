import { DBMerchantModule } from 'src/database/mongodb/merchant/index.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBOrderService } from './index.service';
import { OrderSchema } from './index.schema';
import { DBUserModule } from '../user/index.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'order', schema: OrderSchema }]),
        DBMerchantModule,
        DBUserModule,
    ],
    providers: [DBOrderService],
    exports: [DBOrderService],
})
export class DBOrderModule {}
