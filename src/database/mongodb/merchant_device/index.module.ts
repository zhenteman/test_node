import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantDeviceService } from './index.service';
import { MerchantDeviceSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'merchant_device', schema: MerchantDeviceSchema },
        ]),
    ],
    providers: [DBMerchantDeviceService],
    exports: [DBMerchantDeviceService],
})
export class DBMerchantDeviceModule {}
