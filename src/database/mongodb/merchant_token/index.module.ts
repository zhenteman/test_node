import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantTokenService } from './index.service';
import { MerchantTokenSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_token', schema: MerchantTokenSchema },
        ]),
    ],
    providers: [DBMerchantTokenService],
    exports: [DBMerchantTokenService],
})
export class DBMerchantTokenModule {}
