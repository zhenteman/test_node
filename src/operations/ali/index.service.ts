import { Injectable } from '@nestjs/common';
import AliUtil from '../../utils/ali';
import { AliOssService } from 'nestjs-ali-oss';
import { customOssDir } from '../../utils/oss';

@Injectable()
export class AliService {
    constructor(private readonly aliOssService: AliOssService) {}

    async getInfoStr(user): Promise<string> {
        const data = await AliUtil.createAliPaySign(user.id);
        return data?.signStr;
    }

    async uploadOss(file, dir, desc): Promise<string> {
        const result = await customOssDir(file, dir, desc);

        const { url } = await this.aliOssService.put(
            result.url,
            result.reader,
            result.options,
        );

        return url;
    }

    async notify(data): Promise<string> {
        const trade = await AliUtil.makeNotifyResponse(data);

        let returnStr = 'success';
        let status = 1;
        let contentTime = '支付成功';

        if (!trade) {
            contentTime = '支付失败';
            status = 2;
            returnStr = 'failure';
        } else {
            const pay = {
                order_id: data.out_trade_no,
                openid: trade.id,
                transaction_id: data.trade_no,
            };

            if (trade.status === 'TRADE_CLOSED') {
                status = 3;
                contentTime = '交易关闭';
            }
        }

        return returnStr;
    }
}
