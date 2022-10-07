import * as fs from 'fs';

export default {
    appId: 'wx7d162f80243e809d', // 移动支付id
    secretKey: 'b9348e3c166dfba11c0e89b166bdac47', // 移动支付sk
    mchid: '1600141754',
    partnerKey: 'lianghaoaizhangtingting09171126a',
    // pfx: fs.readFileSync('/tools/com.shoudeng.pub.p12'),
    pfx: '',
    notify_url: {
        dev: 'http://dev.jiandan.shoudeng.pub/pay/wechat/notify',
        prod: 'https://api.reusemin.com/pay/wechat/notify',
    },
    refund_url: {
        dev: 'http://dev.jiandan.shoudeng.pub/pay/wechat/refund',
        prod: 'https://api.reusemin.com/pay/wechat/refund',
    },
    spbill_create_ip: '127.0.0.1',
};
