export default {
    // 获取用户信息
    '/user': {
        GET: true,
    },
    // 更新用户密码
    '/user/password': {
        PATCH: true,
    },
    // 商品分类
    '/classify': {
        GET: true,
        POST: true,
    },
    // 商品
    '/commodity': {
        GET: true,
        POST: true,
        DELETE: true,
        PATCH: true,
    },
    // 商家注册发送验证码
    '/merchant/registry/code': {
        GET: false,
    },
    // 商家提交注册
    '/merchant/registry': {
        POST: false,
    },
    // 首页查询所有商家
    '/merchant': {
        GET: false,
    },
    // 查询商家信息
    '/merchant/info': {
        GET: true,
    },
    // 更新商家极光id;
    '/merchant/jpush': {
        PATCH: true,
    },
    // 查询商家商品分类
    '/merchant/classify': {
        GET: false,
    },
    // 查询商家商品分类的商品
    '/merchant/commodity': {
        GET: false,
    },
    // 商家获取自己的分类，需要登录
    '/merchant/classify/token': {
        GET: true,
    },
    // 商家获取自己的商品，需要登录
    '/merchant/commodity/token': {
        GET: true,
    },
    // 订单查询和创建，需要登录
    '/order': {
        GET: true,
        POST: true,
    },
    '/order/merchant': {
        GET: true,
    },
    // 扫码接口
    '/barcode': {
        GET: true,
    },
    '/wechat/notify': {
        POST: false,
    },
    '/wechat/refund': {
        POST: false,
    },
    '/ali/notify': {
        POST: false,
    },
    '/ali/infostr': {
        GET: false,
    },
    '/ali/upload': {
        POST: false,
    },
    '/sign/in': {
        GET: false,
    },
    '/sign/verify': {
        GET: false,
    },
};
