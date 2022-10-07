import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantAuth, MerchantAuthDocument } from './index.schema';
import { addAuth, CreateAuth, FindAuth } from './index.dto';

@Injectable()
export class DBMerchantAuthService {
    constructor(
        @InjectModel('merchant_auth')
        private authModel: Model<MerchantAuthDocument>,
    ) {}

    // 创建认证
    async create(createAuth: CreateAuth): Promise<MerchantAuth> {
        const created = new this.authModel(createAuth);

        return created.save();
    }

    // 查询认证
    async find(data: FindAuth): Promise<MerchantAuth> {
        return this.authModel.findOne(data);
    }

    // 添加认证
    async add(data: addAuth): Promise<MerchantAuth> {
        return this.authModel.findOneAndUpdate(
            {
                m_id: data.m_id,
            },
            {
                $set: {
                    auth: data.auth,
                },
                $push: {
                    data: data.data,
                },
            },
            {
                new: true,
                upsert: true,
            },
        );
    }
}
