import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBLocaleReportService } from './index.service';
import { LocaleReportSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'locale_report', schema: LocaleReportSchema },
        ]),
    ],
    providers: [DBLocaleReportService],
    exports: [DBLocaleReportService],
})
export class DBLocaleReportModule {}
