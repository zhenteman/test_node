import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reputation, ReputationDocument } from './index.schema';
import {
    CreateReputation,
    FindReputation,
    UpdateReputation,
} from './index.dto';

@Injectable()
export class DBReputationService {
    constructor(
        @InjectModel('reputation')
        private reputationModel: Model<ReputationDocument>,
    ) {}

    // 创建信誉
    async create(createReputation: CreateReputation): Promise<Reputation> {
        const created = new this.reputationModel(createReputation);

        return created.save();
    }

    // 查询信誉
    async find(data: FindReputation): Promise<Reputation> {
        return this.reputationModel.findOne(data);
    }

    // 更新信誉
    async update(data: UpdateReputation): Promise<Reputation> {
        return this.reputationModel.findOneAndUpdate(
            {
                u_id: data.u_id,
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
