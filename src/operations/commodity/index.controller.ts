import { SendBadRequest } from '../../utils/exception';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CommodityService } from './index.service';

@Controller('commodity')
export class CommodityController {
    constructor(private readonly commodityService: CommodityService) {}

    @Get()
    getCommodity(@Query() query, @Req() req) {
        const id = req.$id;
        const class_id = query.c_id;

        if (!class_id || !id) {
            SendBadRequest('参数错误', 400);
        }

        return this.commodityService.getCommodity(id, class_id, true);
    }

    @Post()
    addCommodity(@Req() req, @Body() body) {
        let { name, class_id, price, image } = body;
        price = Number(price);

        if (!name || !class_id || !price || isNaN(price) || !image) {
            SendBadRequest('参数有误', 400);
        }

        body.id = req.$id;
        return this.commodityService.addCommodity(req.$id, body);
    }
}
