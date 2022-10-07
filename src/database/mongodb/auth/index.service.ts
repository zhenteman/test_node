import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './index.schema';
import { addAuth, CreateAuth, FindAuth } from './index.dto';

@Injectable()
export class DBAuthService {
    constructor(
        @InjectModel('auth')
        private authModel: Model<AuthDocument>,
    ) {}

    // 创建认证
    async create(createAuth: CreateAuth): Promise<Auth> {
        const created = new this.authModel(createAuth);

        return created.save();
    }

    // 查询认证
    async find(data: FindAuth): Promise<Auth> {
        return this.authModel.findOne(data);
    }

    // 添加认证
    async add(data: addAuth): Promise<Auth> {
        return this.authModel.findOneAndUpdate(
            {
                u_id: data.u_id,
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
