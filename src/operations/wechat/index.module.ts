import { Module } from '@nestjs/common';
import { WechatController } from './index.controller';
import { WechatService } from './index.service';

@Module({
    controllers: [WechatController],
    providers: [WechatService],
})
export class WechatModule {}
