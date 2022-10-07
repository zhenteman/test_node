import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantToken, MerchantTokenDocument } from './index.schema';
import { CreateToken, UpdateToken } from './index.dto';

@Injectable()
export class DBMerchantTokenService {
    constructor(
        @InjectModel('merchant_token')
        private tokenModel: Model<MerchantTokenDocument>,
    ) {}

    // 创建token
    async create(createToken: CreateToken): Promise<MerchantToken> {
        const created = new this.tokenModel(createToken);
        return created.save();
    }

    // 查找token
    async find(data: UpdateToken): Promise<MerchantToken> {
        return this.tokenModel.findOne(data);
    }

    // 更新token
    async update(data: UpdateToken): Promise<MerchantToken> {
        return this.tokenModel.findOneAndUpdate(
            {
                m_id: data.m_id,
            },
            {
                $set: data,
            },
            {
                new: true,
            },
        );
    }
}
