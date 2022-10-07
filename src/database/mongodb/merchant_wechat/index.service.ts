import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantWechat, MerchantWechatDocument } from './index.schema';
import { CreateWechat, FindWechat, AddWechat } from './index.dto';

@Injectable()
export class DBMerchantWechatService {
    constructor(
        @InjectModel('merchant_wechat')
        private wechatModel: Model<MerchantWechatDocument>,
    ) {}

    // 创建微信
    async create(createWechat: CreateWechat): Promise<MerchantWechat> {
        const created = new this.wechatModel(createWechat);

        return created.save();
    }

    // 查询微信
    async find(data: FindWechat): Promise<MerchantWechat> {
        return this.wechatModel.findOne(data);
    }

    // 新增微信
    async add(data: AddWechat): Promise<MerchantWechat> {
        return this.wechatModel.findOneAndUpdate(
            {
                m_id: data.m_id,
            },
            {
                $push: {
                    wechats: data,
                },
            },
            {
                new: true,
            },
        );
    }
}
