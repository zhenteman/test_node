import { DBMerchantModule } from './../../database/mongodb/merchant/index.module';
import { DBMerchantTokenModule } from './../../database/mongodb/merchant_token/index.module';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DBAlipayModule } from 'src/database/mongodb/alipay/index.module';
import { DBAuthModule } from 'src/database/mongodb/auth/index.module';
import { DBDeviceModule } from 'src/database/mongodb/device/index.module';
import { DBLocaleReportModule } from 'src/database/mongodb/locale_report/index.module';
import { DBReputationModule } from 'src/database/mongodb/reputation/index.module';
import { DBSmsModule } from 'src/database/mongodb/sms/index.module';
import { DBTokenModule } from 'src/database/mongodb/token/index.module';
import { DBUserModule } from 'src/database/mongodb/user/index.module';
import { DBWalletModule } from 'src/database/mongodb/wallet/index.module';
import { DBWechatModule } from 'src/database/mongodb/wechat/index.module';
import { SignController } from './index.controller';
import { SignService } from './index.service';

@Module({
    imports: [
        DBUserModule,
        DBAuthModule,
        DBReputationModule,
        DBLocaleReportModule,
        DBDeviceModule,
        DBWalletModule,
        DBWechatModule,
        DBAlipayModule,
        DBSmsModule,
        DBTokenModule,
        DBMerchantTokenModule,
        DBMerchantModule,
        HttpModule,
    ],
    controllers: [SignController],
    providers: [SignService],
})
export class SignModule {}
