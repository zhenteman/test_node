import { DBClassifyService } from './../../database/mongodb/classify/index.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassifyService {
    constructor(private readonly dbClassifyService: DBClassifyService) {}

    getClassify(id, isMerchant) {
        return this.dbClassifyService.getClassifyData(id, isMerchant);
    }

    async addClassify(name, id) {
        const data = await this.dbClassifyService.addClassifyData(name, id);
        return {
            c_id: data.c_id,
            c_name: data.c_name,
        };
    }
}
