import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBSmsService } from './index.service';
import { SmsSchema } from './index.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'sms', schema: SmsSchema }])],
    providers: [DBSmsService],
    exports: [DBSmsService],
})
export class DBSmsModule {}
