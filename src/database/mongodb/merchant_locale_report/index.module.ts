import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantLocaleReportService } from './index.service';
import { MerchantLocaleReportSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'merchant_locale_report',
                schema: MerchantLocaleReportSchema,
            },
        ]),
    ],
    providers: [DBMerchantLocaleReportService],
    exports: [DBMerchantLocaleReportService],
})
export class DBMerchantLocaleReportModule {}
