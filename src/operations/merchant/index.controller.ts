import { SendBadRequest } from '../../utils/exception';
import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { MerchantService } from './index.service';

@Controller('merchant')
export class MerchantController {
    constructor(private readonly merchantService: MerchantService) {}

    @Get()
    getMerchant(@Query() query) {
        return this.merchantService.getMerchant(query);
    }

    @Get('/info')
    getMerchantInfo(@Req() req) {
        return this.merchantService.getMerchantInfo(req.$id);
    }

    @Patch('/jpush')
    patchJpushId(@Req() req, @Body() body) {
        return this.merchantService.patchJpushId(req.$id, body.id);
    }

    @Get('/classify')
    getMerchantClassify(@Query() query) {
        const { id } = query;
        if (!id) {
            SendBadRequest('商家数据错误', 400);
        }

        return this.merchantService.getMerchantClassify(id);
    }

    @Get('/classify/token')
    getMerchantClassifyToken(@Req() req) {
        return this.merchantService.getMerchantClassify(req.$id);
    }

    @Get('/commodity')
    getMerchantCommodity(@Query() query) {
        const { id, c_id } = query;
        if (!id || !c_id) {
            SendBadRequest('商家数据错误', 400);
        }

        return this.merchantService.getMerchantCommodity(id, c_id);
    }

    @Get('/commodity/token')
    getMerchantCommodityToken(@Req() req, @Query() query) {
        const { c_id } = query;
        if (!c_id) {
            SendBadRequest('商家数据错误', 400);
        }

        return this.merchantService.getMerchantCommodity(req.$id, c_id);
    }
}
