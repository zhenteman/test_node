import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBAlipayService } from './index.service';
import { AlipaySchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'alipay', schema: AlipaySchema }]),
    ],
    providers: [DBAlipayService],
    exports: [DBAlipayService],
})
export class DBAlipayModule {}
