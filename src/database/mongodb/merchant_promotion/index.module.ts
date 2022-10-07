import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantPromotionService } from './index.service';
import { MerchantPromotionSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_promotion', schema: MerchantPromotionSchema },
        ]),
    ],
    providers: [DBMerchantPromotionService],
    exports: [DBMerchantPromotionService],
})
export class DBMerchantPromotionModule {}
