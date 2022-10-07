import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantPromotion, MerchantPromotionDocument } from './index.schema';
import { FindActivity, UpdateActivity } from './index.dto';

@Injectable()
export class DBMerchantPromotionService {
    constructor(
        @InjectModel('merchant_promotion')
        private activityModel: Model<MerchantPromotionDocument>,
    ) {}

    // 创建活动
    async create(createActivity): Promise<MerchantPromotion> {
        const created = new this.activityModel(createActivity);

        return created.save();
    }

    // 查询活动
    async find(data: FindActivity): Promise<MerchantPromotion> {
        return this.activityModel.findOne(data);
    }

    // 更新活动
    async update(data: UpdateActivity): Promise<MerchantPromotion> {
        const update = {};

        if (data.status) {
            update['activities.$.status'] = data.status;
        }

        if (data.stop) {
            update['activities.$.stop'] = data.stop;
        }

        if (data.start) {
            update['activities.$.start'] = data.start;
        }

        return this.activityModel.findOneAndUpdate(
            {
                'activities._id': data._id,
            },
            {
                $set: update,
            },
            {
                new: true,
            },
        );
    }
}
