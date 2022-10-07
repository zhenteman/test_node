import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantWalletService } from './index.service';
import { MerchantWalletSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_wallet', schema: MerchantWalletSchema },
        ]),
    ],
    providers: [DBMerchantWalletService],
    exports: [DBMerchantWalletService],
})
export class DBMerchantWalletModule {}
