import { SiteQueueService } from './../../queue/site/index.service';
import { DBClassifyService } from './../../database/mongodb/classify/index.service';
import { DBCommodityService } from './../../database/mongodb/commodity/index.service';
import { SendBadRequest } from 'src/utils/exception';
import { DBOrderService } from './../../database/mongodb/order/index.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
    constructor(
        private readonly dbOrderService: DBOrderService,
        private readonly dbClassifyService: DBClassifyService,
        private readonly dbCommodityService: DBCommodityService,
        private readonly siteQueueService: SiteQueueService,
    ) {}

    async addOrder(body) {
        const { orders, m_id } = body;

        body.type = 1;
        body.pay_type = 10;
        body.pay_status = 5;
        body.status = 1;
        body.price = 0;

        if (!Array.isArray(orders) || !orders.length) {
            return SendBadRequest('商品数据有误', 400);
        }

        const find = orders.find((order) => !order.count);
        if (find) {
            return SendBadRequest('商品数量不能为空', 400);
        }

        let promiseStack: any = orders.map((item) => {
            return new Promise(async (resolve, reject) => {
                const classify =
                    await this.dbClassifyService.getClassifyByIdAndMIdAndStatus(
                        item.class_id,
                        m_id,
                    );

                const commodify =
                    await this.dbCommodityService.getCommodityMidAndCidAndClassId(
                        m_id,
                        item.class_id,
                        item.c_id,
                    );

                if (!classify || !commodify) {
                    return reject();
                }

                const data = commodify.commodity.find(
                    (val) => val['id'] == m_id,
                );

                resolve({
                    class_id: item.class_id,
                    class_name: classify.c_name,
                    c_id: item.c_id,
                    c_name: commodify.c_name,
                    image: data['image'],
                    price: data['price'],
                    const_price: data['const_price'],
                    discount_price: data['discount_price'],
                    count: item.count,
                    code: data['code'],
                });
            });
        });

        try {
            promiseStack = await Promise.all(promiseStack);

            promiseStack.forEach((item) => {
                const price = item.discount_price || item.price;
                body.price += price * item.count;
            });

            body.orders = promiseStack;
        } catch (error) {
            return SendBadRequest('商品内数据有误', 400);
        }

        const jr_id = await this.dbOrderService.findJpushId(m_id);

        if (!jr_id) {
            return;
        }

        await this.dbOrderService.addOrder(body);

        this.siteQueueService.add({
            alert: '您有新订单，请及时处理',
            title: '您有新订单，请及时处理',
            id: jr_id,
        });
    }

    merchantOrders(m_id) {
        return this.dbOrderService.findMerchantOrder(m_id);
    }
}
