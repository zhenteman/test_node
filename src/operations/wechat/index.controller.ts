import { Body, Controller, Header, Post, Req } from '@nestjs/common';
import { WechatService } from './index.service';

@Controller('wechat')
export class WechatController {
    constructor(private readonly wechatService: WechatService) {}

    @Post('notify')
    @Header('content-type', 'application/xml; charset=utf-8')
    async notify(@Body() body) {
        return this.wechatService.notify(body);
    }

    @Post('refund')
    @Header('content-type', 'application/xml; charset=utf-8')
    async refund(@Body() body) {
        return this.wechatService.refund(body);
    }
}
