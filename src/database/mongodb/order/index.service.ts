import { DBMerchantService } from './../merchant/index.service';
import { SendBadRequest } from '../../../utils/exception';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument } from './index.schema';
import { DBUserService } from '../user/index.service';

@Injectable()
export class DBOrderService {
    constructor(
        @InjectModel('order')
        private orderModel: Model<OrderDocument>,
        private readonly dbMerchantService: DBMerchantService,
        private readonly dbUserService: DBUserService,
    ) {}

    async addOrder(data) {
        const merchant = await this.dbMerchantService.find_Id({
            m_id: data.m_id,
        });

        if (!merchant) {
            return SendBadRequest('商户不存在', 400);
        }

        let user: any = await this.dbUserService.find_Id({
            u_id: data.u_id,
        });
        if (!user) {
            user = await this.dbMerchantService.find_Id({
                m_id: data.u_id,
            });
        }

        if (!user) {
            return SendBadRequest('用户不存在', 400);
        }

        data.user = user._id;
        data.merchant = merchant._id;
        data.o_id = Date.now();

        const created = new this.orderModel(data);
        return created.save();
    }

    async findJpushId(m_id) {
        const data = await this.dbMerchantService.findJrIdByMid(m_id);
        if (!data) {
            return;
        }

        return data.jr_id;
    }

    async findMerchantOrder(m_id) {
        return this.orderModel
            .find(
                {
                    m_id,
                },
                {
                    _id: 0,
                    __v: 0,
                    'orders._id': 0,
                    'orders.created_time': 0,
                    'orders.updated_time': 0,
                },
            )
            .sort({
                created_time: -1,
            });
    }
}
