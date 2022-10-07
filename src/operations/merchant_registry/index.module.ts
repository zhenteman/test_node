import { DBMerchantPromotionModule } from './../../database/mongodb/merchant_promotion/index.module';
import { DBMerchantCertificationModule } from './../../database/mongodb/merchant_certification/index.module';
import { DBMerchantAlipayModule } from './../../database/mongodb/merchant_alipay/index.module';
import { DBMerchantWechatModule } from './../../database/mongodb/merchant_wechat/index.module';
import { DBMerchantWalletModule } from './../../database/mongodb/merchant_wallet/index.module';
import { DBMerchantLocaleReportModule } from './../../database/mongodb/merchant_locale_report/index.module';
import { DBMerchantDeviceModule } from './../../database/mongodb/merchant_device/index.module';
import { DBMerchantAuthModule } from './../../database/mongodb/merchant_auth/index.module';
import { DBMerchantModule } from '../../database/mongodb/merchant/index.module';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MerchantRegistryController } from './index.controller';
import { MerchantRegistryService } from './index.service';
import { DBMerchantSmsModule } from 'src/database/mongodb/merchant_sms/index.module';
import { DBMerchantReputationModule } from 'src/database/mongodb/merchant_reputation/index.module';

@Module({
    imports: [
        DBMerchantSmsModule,
        DBMerchantModule,
        HttpModule,
        DBMerchantAuthModule,
        DBMerchantDeviceModule,
        DBMerchantLocaleReportModule,
        DBMerchantReputationModule,
        DBMerchantWalletModule,
        DBMerchantWechatModule,
        DBMerchantAlipayModule,
        DBMerchantCertificationModule,
        DBMerchantPromotionModule,
    ],
    controllers: [MerchantRegistryController],
    providers: [MerchantRegistryService],
})
export class MerchantRegistryModule {}
