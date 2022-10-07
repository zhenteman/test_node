import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantReputationService } from './index.service';
import { MerchantReputationSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_reputation', schema: MerchantReputationSchema },
        ]),
    ],
    providers: [DBMerchantReputationService],
    exports: [DBMerchantReputationService],
})
export class DBMerchantReputationModule {}
