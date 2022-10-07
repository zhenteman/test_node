import { SendBadRequest } from './../../../utils/exception';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClassifyDocument } from './index.schema';

@Injectable()
export class DBClassifyService {
    constructor(
        @InjectModel('classify')
        private classifyModel: Model<ClassifyDocument>,
    ) {}

    // 根据商家id获取对应的分类列表
    async getClassifyData(id, isMerchant?) {
        const query = {
            'ids.id': id,
        };

        // if (!isMerchant) {
        //     query['ids.status'] = 3;
        // }

        const data = await this.classifyModel.find(query);

        if (!data || !data.length) {
            return [];
        }

        return data.map((item) => ({ c_id: item.c_id, c_name: item.c_name }));
    }

    // 根据分类id和商家id查询是否存在
    getClassifyByIdAndMId(c_id, id) {
        return this.classifyModel.findOne({
            c_id,
            'ids.id': id,
        });
    }

    // 根据分类id和商家id和状态查询是否存在
    getClassifyByIdAndMIdAndStatus(c_id, id) {
        return this.classifyModel.findOne({
            c_id,
            'ids.id': id,
        });
    }

    // 根据分类名称查询数据
    getClassifyName(c_name) {
        return this.classifyModel.findOne({
            c_name,
        });
    }

    // 查找最后一个用户
    async findClassifyCount(): Promise<number> {
        const count = await this.classifyModel.find().count();
        return count + 1;
    }

    // 根据名称和商家id查询是否存在
    getClassifyByNameAndId(c_name, id) {
        return this.classifyModel.findOne({
            c_name,
            'ids.id': id,
        });
    }

    // 添加分类
    async addClassifyData(c_name, id) {
        const item = await this.getClassifyName(c_name);
        const query = {
            c_name,
        };

        if (item) {
            const data = await this.getClassifyByNameAndId(c_name, id);
            if (data) {
                return SendBadRequest('分类重复不可添加', 400);
            }
        } else {
            const count = await this.findClassifyCount();
            query['c_id'] = count;
        }

        return this.classifyModel.findOneAndUpdate(
            query,
            {
                $push: {
                    ids: {
                        id,
                        status: 0,
                    },
                },
            },
            {
                upsert: true,
                new: true,
            },
        );
    }
}
