import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantCertificationService } from './index.service';
import { MerchantCertificationSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'merchant_certification',
                schema: MerchantCertificationSchema,
            },
        ]),
    ],
    providers: [DBMerchantCertificationService],
    exports: [DBMerchantCertificationService],
})
export class DBMerchantCertificationModule {}
