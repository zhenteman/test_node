import { Injectable } from '@nestjs/common';
import xmlUtil from '../../utils/xml2json';

@Injectable()
export class WechatService {
    notify(data): string {
        const json = xmlUtil.toJson(data);
        if (!json.xml) {
            return xmlUtil.replyData('数据异常');
        }

        const info = json.xml;
        let status = 1;
        if (info.result_code !== 'SUCCESS') {
            status = 2;
        }

        const pay = {
            order_id: info.out_trade_no,
            open_id: info.openid,
            transaction_id: info.transaction_id,
        };

        return xmlUtil.replyData(status === 1 ? '支付成功' : '支付失败');
    }

    refund(data) {
        const json = xmlUtil.toJson(data);
        if (!json.xml) {
            return xmlUtil.replyData('数据异常');
        }

        const info = json.xml;

        const refund = {
            order_id: info.out_trade_no,
            refund_id: info.refund_id,
        };

        let status = 1;
        if (info.result_code !== 'SUCCESS') {
            status = 2;
        }

        return xmlUtil.replyData(status === 1 ? '退款成功' : '退款失败');
    }
}
