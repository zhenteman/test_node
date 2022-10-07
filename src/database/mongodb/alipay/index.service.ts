import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Alipay, AlipayDocument } from './index.schema';
import { CreateAlipay, FindAlipay, AddAlipay } from './index.dto';

@Injectable()
export class DBAlipayService {
    constructor(
        @InjectModel('alipay')
        private alipayModel: Model<AlipayDocument>,
    ) {}

    // 创建支付宝
    async create(createWechat: CreateAlipay): Promise<Alipay> {
        const created = new this.alipayModel(createWechat);

        return created.save();
    }

    // 查询支付宝
    async find(data: FindAlipay): Promise<Alipay> {
        return this.alipayModel.findOne(data);
    }

    // 新增支付宝
    async add(data: AddAlipay): Promise<Alipay> {
        return this.alipayModel.findOneAndUpdate(
            {
                u_id: data.u_id,
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
