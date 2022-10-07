import * as fs from 'fs';

export const accessKeyId = 'LTAI4FgaeZsJudCJwhVJyY1J';
export const accessKeySecret = 'A90MgPTBI2zqMTR5BnCc5TC1Y8l7Jl';
export const appId = '2021001167694345';
export const oss = {
    region: 'oss-cn-beijing',
    bucket: 'shoudeng',
};

export const rsaPrivate = fs.readFileSync('./src/assets/pem/ali_private.pem');
export const rsaPublic = fs.readFileSync('./src/assets/pem/ali_public.pem');

export const notify_url = {
    dev: 'http://dev.jiandan.shoudeng.pub/pay/ali/notify',
    prod: 'https://api.reusemin.com/pay/ali/notify',
};

export const paySign = {
    apiname: 'com.alipay.account.auth',
    method: 'alipay.open.auth.sdk.code.get',
    app_id: appId,
    app_name: 'mc',
    biz_type: 'openservice',
    pid: '2088831005846591',
    product_id: 'APP_FAST_LOGIN',
    scope: 'kuaijie',
    auth_type: 'AUTHACCOUNT',
    sign_type: 'RSA2',
};
