import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantSmsService } from './index.service';
import { MerchantSmsSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_sms', schema: MerchantSmsSchema },
        ]),
    ],
    providers: [DBMerchantSmsService],
    exports: [DBMerchantSmsService],
})
export class DBMerchantSmsModule {}
