import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantReputation, MerchantReputationDocument } from './index.schema';
import {
    CreateReputation,
    FindReputation,
    UpdateReputation,
} from './index.dto';

@Injectable()
export class DBMerchantReputationService {
    constructor(
        @InjectModel('merchant_reputation')
        private reputationModel: Model<MerchantReputationDocument>,
    ) {}

    // 创建信誉
    async create(
        createReputation: CreateReputation,
    ): Promise<MerchantReputation> {
        const created = new this.reputationModel(createReputation);

        return created.save();
    }

    // 查询信誉
    async find(data: FindReputation): Promise<MerchantReputation> {
        return this.reputationModel.findOne(data);
    }

    // 更新信誉
    async update(data: UpdateReputation): Promise<MerchantReputation> {
        return this.reputationModel.findOneAndUpdate(
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
