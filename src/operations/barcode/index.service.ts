import { SendBadRequest } from 'src/utils/exception';
import { DBBarcodeService } from './../../database/mongodb/barcode/index.service';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import codeConfig from 'src/config/barcode.config';

@Injectable()
export class BarcodeService {
    constructor(
        private readonly dbBarcodeService: DBBarcodeService,
        private readonly httpService: HttpService,
    ) {}

    async findCodeData(code) {
        const codeData = await this.dbBarcodeService.findCode(code);

        if (codeData) {
            return codeData;
        }

        // 创建极光用户
        let { data } = await this.httpService
            .get(codeConfig.url, {
                params: {
                    code,
                },
            })
            .toPromise();

        // if (data.code == '10000') {
        if (data.showapi_res_code !== 0) {
            return SendBadRequest('查询失败', 400);
        }
        // } else {
        //     return SendBadRequest('查询失败', 400);
        // }

        data = data.showapi_res_body;

        await this.dbBarcodeService.updateCode(code, data);
        return data;
    }
}
