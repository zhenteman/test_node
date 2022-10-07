import { SendBadRequest } from 'src/utils/exception';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OrderService } from './index.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    addOrder(@Body() body, @Req() req) {
        body.u_id = req.$id;
        return this.orderService.addOrder(body);
    }

    @Get('/merchant')
    merchantOrders(@Req() req) {
        if (!req.isMerchant) {
            return SendBadRequest('此帐号不属于商户', 400);
        }

        console.log(123);

        return this.orderService.merchantOrders(req.$id);
    }
}
