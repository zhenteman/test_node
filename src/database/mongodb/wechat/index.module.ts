import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBWechatService } from './index.service';
import { WechatSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'wechat', schema: WechatSchema }]),
    ],
    providers: [DBWechatService],
    exports: [DBWechatService],
})
export class DBWechatModule {}
