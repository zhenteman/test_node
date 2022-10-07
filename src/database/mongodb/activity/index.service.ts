import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './index.schema';
import { CreateActivity, FindActivity, UpdateActivity } from './index.dto';

@Injectable()
export class DBActivityService {
    constructor(
        @InjectModel('activity')
        private activityModel: Model<ActivityDocument>,
    ) {}

    // 创建活动
    async create(createActivity: CreateActivity): Promise<Activity> {
        const created = new this.activityModel(createActivity);

        return created.save();
    }

    // 查询活动
    async find(data: FindActivity): Promise<Activity> {
        return this.activityModel.findOne(data);
    }

    // 更新活动
    async update(data: UpdateActivity): Promise<Activity> {
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
