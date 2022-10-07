import { DBCommodityService } from './../../database/mongodb/commodity/index.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommodityService {
    constructor(private readonly dbCommodityService: DBCommodityService) {}

    getCommodity(id, c_id, isMerchant) {
        return this.dbCommodityService.getCommodityData(id, c_id, isMerchant);
    }

    addCommodity(id, body) {
        return this.dbCommodityService.addCommodityData(id, body);
    }
}
