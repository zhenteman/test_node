const TRANSACTION_NAMES_MAP = {
    '/': {
        GET: '首页访问',
    },
    '/user': {
        GET: '查询用户',
    },
    '/wechat/notify': {
        POST: '微信支付通知',
    },
    '/wechat/refund': {
        POST: '微信退款通知',
    },
    '/ali/notify': {
        POST: '支付宝通知',
    },
    '/ali/infostr': {
        GET: '支付宝签名获取',
    },
    '/ali/upload': {
        POST: '阿里云OSS',
    },
    '/sign/in': {
        POST: '登录',
    },
    '/sign/verify': {
        POST: '登录验证',
    },
};

export default TRANSACTION_NAMES_MAP;
