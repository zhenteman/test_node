import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantAlipay, MerchantAlipayDocument } from './index.schema';
import { CreateAlipay, FindAlipay, AddAlipay } from './index.dto';

@Injectable()
export class DBMerchantAlipayService {
    constructor(
        @InjectModel('merchant_alipay')
        private alipayModel: Model<MerchantAlipayDocument>,
    ) {}

    // 创建支付宝
    async create(createWechat: CreateAlipay): Promise<MerchantAlipay> {
        const created = new this.alipayModel(createWechat);

        return created.save();
    }

    // 查询支付宝
    async find(data: FindAlipay): Promise<MerchantAlipay> {
        return this.alipayModel.findOne(data);
    }

    // 新增支付宝
    async add(data: AddAlipay): Promise<MerchantAlipay> {
        return this.alipayModel.findOneAndUpdate(
            {
                m_id: data.m_id,
            },
            {
                $push: {
                    alipays: data,
                },
            },
            {
                new: true,
            },
        );
    }
}
