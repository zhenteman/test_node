import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantAuthService } from './index.service';
import { AuthSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_auth', schema: AuthSchema },
        ]),
    ],
    providers: [DBMerchantAuthService],
    exports: [DBMerchantAuthService],
})
export class DBMerchantAuthModule {}
