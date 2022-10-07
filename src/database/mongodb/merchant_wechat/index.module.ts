import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantWechatService } from './index.service';
import { MerchantWechatSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_wechat', schema: MerchantWechatSchema },
        ]),
    ],
    providers: [DBMerchantWechatService],
    exports: [DBMerchantWechatService],
})
export class DBMerchantWechatModule {}
