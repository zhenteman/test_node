import WX_CONFIG from './wx.config';
import * as ALI_CONFIG from './ali.config';

const tag = 'dev';

const ALIPAY = {
    app_id: ALI_CONFIG.appId,
    appPrivKeyFile: ALI_CONFIG.rsaPrivate,
    alipayPubKeyFile: ALI_CONFIG.rsaPublic,
    notify_url: ALI_CONFIG.notify_url[tag],
};

const WECHATPAY = {
    appid: WX_CONFIG.appId,
    mchid: WX_CONFIG.mchid,
    partnerKey: WX_CONFIG.partnerKey,
    notify_url: WX_CONFIG.notify_url[tag],
    refund_url: WX_CONFIG.refund_url[tag],
    spbill_create_ip: WX_CONFIG.spbill_create_ip,
    pfx: WX_CONFIG.pfx,
};

export { ALIPAY, WECHATPAY };
