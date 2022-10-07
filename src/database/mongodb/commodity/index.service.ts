import { SendBadRequest } from '../../../utils/exception';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommodityDocument } from './index.schema';
import { DBClassifyService } from '../classify/index.service';

@Injectable()
export class DBCommodityService {
    constructor(
        @InjectModel('commodity')
        private commodityModel: Model<CommodityDocument>,
        private readonly dbClassifyService: DBClassifyService,
    ) {}

    // 根据商家id获取对应的分类列表
    async getCommodityData(id, class_id, isMerchant?) {
        const query = {
            'commodity.id': id,
            'commodity.class_id': class_id,
        };

        // if (!isMerchant) {
        //     query['commodity.status'] = 3;
        // }

        const data = await this.commodityModel.find(query);

        return this.computedCommodityData(data, id, class_id);
    }

    getCommodityMidAndCidAndClassId(id, class_id, c_id) {
        const query = {
            'commodity.id': id,
            'commodity.class_id': class_id,
            c_id,
        };

        // if (!isMerchant) {
        //     query['commodity.status'] = 3;
        // }

        return this.commodityModel.findOne(query);
    }

    computedCommodityData(data, id, class_id) {
        if (!data || !data.length) {
            return [];
        }

        return data.map((item) => {
            const commodity = {
                c_id: item.c_id,
                c_name: item.c_name,
            };

            const find = item.commodity.find(
                (val) =>
                    val['class_id'] === String(class_id) && val['id'] === id,
            );

            return Object.assign(commodity, {
                class_id: find['class_id'],
                price: find['price'],
                image: find['image'],
                code: find['code'],
                describe: find['describe'],
                month_sales: find['month_sales'],
                const_price: find['const_price'],
                suggest_price: find['suggest_price'],
                trade_mark: find['trade_mark'],
                manu_name: find['manu_name'],
                is_promotion: find['is_promotion'],
                discount_price: find['discount_price'],
                is_stick: find['is_stick'],
                specification: find['specification'],
                top_sales: find['top_sales'],
            });
        });
    }

    // 根据商品名称查询数据
    getCommodityName(c_name) {
        return this.commodityModel.findOne({
            c_name,
        });
    }

    // 查找最后一个商品
    async findCommodityCount(): Promise<number> {
        const count = await this.commodityModel.find().count();
        return count + 1;
    }

    // 根据名称和商家id查询是否存在
    getCommodityByNameAndId(c_name, id) {
        return this.commodityModel.findOne({
            c_name,
            'commodity.id': id,
        });
    }

    // 添加分类
    async addCommodityData(id, body) {
        const classify = await this.dbClassifyService.getClassifyByIdAndMId(
            body.class_id,
            id,
        );

        if (!classify) {
            return SendBadRequest('不存在该分类', 400);
        }

        const item = await this.getCommodityName(body.name);
        const query = {
            c_name: body.name,
        };

        if (item) {
            const data = await this.getCommodityByNameAndId(body.name, id);
            if (data) {
                return SendBadRequest('商品重复不可添加', 400);
            }
        } else {
            const count = await this.findCommodityCount();
            query['c_id'] = count;
        }

        body.status = 0;
        const commodity = await this.commodityModel.findOneAndUpdate(
            query,
            {
                $push: {
                    commodity: body,
                },
            },
            {
                upsert: true,
                new: true,
            },
        );

        const [data] = this.computedCommodityData(
            [commodity],
            id,
            body.class_id,
        );

        return data;
    }
}
