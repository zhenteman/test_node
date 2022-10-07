import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantAlipayService } from './index.service';
import { MerchantAlipaySchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_alipay', schema: MerchantAlipaySchema },
        ]),
    ],
    providers: [DBMerchantAlipayService],
    exports: [DBMerchantAlipayService],
})
export class DBMerchantAlipayModule {}
