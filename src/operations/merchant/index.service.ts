import { SendBadRequest } from 'src/utils/exception';
import { DBCommodityService } from './../../database/mongodb/commodity/index.service';
import { DBClassifyService } from './../../database/mongodb/classify/index.service';
import { DBMerchantService } from './../../database/mongodb/merchant/index.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MerchantService {
    constructor(
        private readonly dbMerchantService: DBMerchantService,
        private readonly dbClassifyService: DBClassifyService,
        private readonly dbCommodityService: DBCommodityService,
    ) {}

    async getMerchant(query) {
        let { size = 20, page = 1 } = query;
        size = Number(size);
        page = Number(page);

        if (isNaN(size)) {
            size = 20;
        }

        if (isNaN(page)) {
            page = 1;
        }

        const data = await this.dbMerchantService.findAllMerchant({
            page,
            size,
        });
        if (!data || !data.length) {
            return [];
        }

        return data.map((item) => {
            return {
                merchant_name: item.merchant_name || '暂无名称',
                m_id: item.m_id,
                area: item.area,
                avatar: item.avatar,
                status: item.status,
                star: 5,
                month_sales: item.month_sales || 0,
                delivery_price: item.delivery_price || 0,
                per_capita: item.per_capita || 0,
                delivery_rule: item.delivery_rule || 0,
            };
        });
    }

    patchJpushId(m_id, id) {
        return this.dbMerchantService.patchJpushId(m_id, id);
    }

    async getMerchantInfo(id) {
        const data = await this.dbMerchantService.getMerchantInfo(id);
        if (!data) {
            return SendBadRequest('未查到商家信息', 400);
        }

        return data;
    }

    async getMerchantClassify(id) {
        const data = await this.dbMerchantService.findByStatus(id);
        if (!data) {
            return SendBadRequest('商家数据异常', 400);
        }

        return this.dbClassifyService.getClassifyData(id);
    }

    async getMerchantCommodity(id, class_id) {
        const data = await this.dbMerchantService.findByStatus(id);
        if (!data) {
            return SendBadRequest('商家数据异常', 400);
        }

        return this.dbCommodityService.getCommodityData(id, class_id);
    }
}
