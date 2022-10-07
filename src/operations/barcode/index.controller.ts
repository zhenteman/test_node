import { SendBadRequest } from 'src/utils/exception';
import { Body, Controller, Get, Query, Req } from '@nestjs/common';
import { BarcodeService } from './index.service';

@Controller('barcode')
export class BarcodeController {
    constructor(private readonly barcodeService: BarcodeService) {}

    @Get()
    addOrder(@Query() query, @Req() req) {
        if (!req.isMerchant) {
            SendBadRequest('账号异常', 400);
        }

        const { code } = query;
        if (!code) {
            SendBadRequest('code不能为空', 400);
        }

        const prefix = code.substr(0, 2);
        if (prefix !== '69' || (code.length !== 13 && code.length !== 14)) {
            SendBadRequest('code格式不正确', 400);
        }

        return this.barcodeService.findCodeData(code);
    }
}
