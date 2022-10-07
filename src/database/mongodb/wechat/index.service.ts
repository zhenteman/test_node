import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wechat, WechatDocument } from './index.schema';
import { CreateWechat, FindWechat, AddWechat } from './index.dto';

@Injectable()
export class DBWechatService {
    constructor(
        @InjectModel('wechat')
        private wechatModel: Model<WechatDocument>,
    ) {}

    // 创建微信
    async create(createWechat: CreateWechat): Promise<Wechat> {
        const created = new this.wechatModel(createWechat);

        return created.save();
    }

    // 查询微信
    async find(data: FindWechat): Promise<Wechat> {
        return this.wechatModel.findOne(data);
    }

    // 新增微信
    async add(data: AddWechat): Promise<Wechat> {
        return this.wechatModel.findOneAndUpdate(
            {
                u_id: data.u_id,
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
