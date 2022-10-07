import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { SendBadRequest } from 'src/utils/exception';
import { isPhoneNumber } from 'src/utils/validate';
import { MerchantRegistryService } from './index.service';

@Controller('merchant/registry')
export class MerchantRegistryController {
    constructor(
        private readonly merchantRegistryService: MerchantRegistryService,
    ) {}

    @Get('/code')
    async signIn(@Query() query) {
        const phone = query.phone?.trim();
        const isValid = isPhoneNumber(phone);

        if (!isValid) {
            SendBadRequest('手机号不正确');
        }

        const code = await this.merchantRegistryService.signInCode(query.phone);
        this.merchantRegistryService.sendSmsCodeReuqest(phone, code);
        this.merchantRegistryService.conditionUserCreateSchema(
            query.phone,
            code,
        );
        return;
    }

    @Post()
    async verify(@Body() body) {
        let { phone } = body;
        phone = phone?.trim();
        const isValid = isPhoneNumber(phone);

        if (!isValid) {
            SendBadRequest('手机号不正确');
        }

        await this.merchantRegistryService.submitAuditMerchant(body);
    }
}
