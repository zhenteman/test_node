import { Controller, Get, Query } from '@nestjs/common';
import { SendBadRequest } from 'src/utils/exception';
import { isPhoneNumber } from 'src/utils/validate';
import { SignService } from './index.service';

@Controller('sign')
export class SignController {
    constructor(private readonly signService: SignService) {}

    @Get('in')
    async signIn(@Query() query) {
        const phone = query.phone?.trim();
        const isValid = isPhoneNumber(phone);

        if (!isValid) {
            SendBadRequest('手机号不正确');
        }

        if (query.type === 'code' && query.merchant) {
            SendBadRequest('登录格式不正确');
        }

        if (query.type === 'code') {
            const code = await this.signService.signInCode(query.phone);
            this.signService.sendSmsCodeReuqest(query.phone, code);
            this.signService.conditionUserCreateSchema(query.phone, code);
            return;
        }

        return this.signService.signInPass(query);
    }

    @Get('verify')
    async verify(@Query() query) {
        const phone = query.phone?.trim();
        const isValid = isPhoneNumber(phone);

        if (!isValid) {
            SendBadRequest('手机号不正确');
        }

        return this.signService.verify(query);
    }
}
