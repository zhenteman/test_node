// eslint-disable-next-line @typescript-eslint/no-var-requires
const Alipay = require('alipay-mobile-dyc');
import { ALIPAY } from '../config/pay.config';
import { paySign } from '../config/ali.config';

const service = new Alipay(ALIPAY);

const basic = {
    notify_url: ALIPAY.notify_url,
};

//创建订单
const createOrder = async (data, basicParams = {}) => {
    const params = {
        subject: data.desc,
        out_trade_no: data.id,
        total_amount: data.price,
    };

    try {
        const result = await service.createOrder(params, {
            ...basicParams,
            ...basic,
        });

        if (!result) {
            return;
        }

        return {
            code_url: result.data,
        };
    } catch (e) {
        return;
    }
};

// 支付宝手机网页支付
const createWebOrderURL = async (data, basicParams = {}) => {
    const params = {
        subject: data.desc,
        out_trade_no: data.id,
        total_amount: data.price,
    };

    const result = await service.createWebOrderURL(params, {
        ...basicParams,
        ...basic,
    });
    console.log(result);
};

// 创建pc端订单
const createPageOrderURL = async (data, basicParams = {}) => {
    const params = {
        subject: data.desc,
        out_trade_no: data.id,
        total_amount: data.price,
    };

    try {
        const result = await service.createPageOrderURL(params, {
            ...basicParams,
            ...basic,
        });

        if (!result) {
            return;
        }

        return {
            code_url: result.data,
        };
    } catch (e) {
        return;
    }
};
// 查询订单
const queryOrder = async (id) => {
    try {
        const result = await service.queryOrder({ out_trade_no: id }, basic);
        if (!result || !result.data) {
            return;
        }

        return {
            id: result.data.buyer_user_id,
            status: result.data.trade_status,
        };
    } catch (e) {
        return;
    }
};

//取消订单
const cancelOrder = async (id) => {
    const result = await service.cancelOrder({ out_trade_no: id }, basic);
    console.log(result);
};

// 关闭订单
const tradeClose = async (id) => {
    const result = await service.tradeClose({ out_trade_no: id }, basic);
    console.log(result);
};

// 退款
const tradeRefund = async (id) => {
    const result = await service.tradeRefund({ out_trade_no: id }, basic);
    console.log(result);
};

// 退款查询
const tradeRefundQuery = async (id) => {
    const result = await service.tradeRefundQuery({ out_trade_no: id }, basic);
    console.log(result);
};

// 支付宝账户转账
const toaccountTransfer = async (data) => {
    const params = {
        out_biz_no: data.id,
        payee_type: 'ALIPAY_LOGONID',
        payee_account: data.account,
        amount: data.amount,
    };

    const result = await service.toaccountTransfer(params, basic);
    console.log(result);
};

// 查询转账订单
const queryTransferOrder = async (id) => {
    const result = await service.queryTransferOrder({ out_biz_no: id }, basic);
    console.log(result);
};

// 生成签名
const createAliPaySign = async (id) => {
    try {
        const params = {
            ...paySign,
            target_id: id,
        };

        const result = await service.createAliPaySign(params);

        return {
            sign: result.sign,
            signStr: result.signStr,
        };
    } catch (e) {
        return {};
    }
};

// 支付宝会员授权信息查询接口
const getUserInfoShare = async (token) => {
    try {
        const result = await service.getUserInfoShare(
            {},
            { auth_token: token },
        );
        if (result.data.code !== '10000') {
            return;
        }

        let sex = 0;
        if (result.data.gender === 'F') {
            sex = 2;
        }
        if (result.data.gender === 'M') {
            sex = 1;
        }

        return {
            avatar: result.data.avatar,
            province: result.data.province,
            city: result.data.city,
            nickname: result.data.nick_name,
            sex,
        };
    } catch (e) {
        return;
    }
};

// code换取token
const getSystemOAuthToken = async (code) => {
    try {
        const data = {
            grant_type: 'authorization_code',
            code,
        };

        const result = await service.getSystemOAuthToken({}, data);
        if (!result.data.user_id) {
            return;
        }

        return {
            user_id: result.data.user_id,
            access_token: result.data.access_token,
            refresh_token: result.data.refresh_token,
        };
    } catch (e) {
        return;
    }
};

const makeNotifyResponse = async (data) => {
    try {
        const result = await service.makeNotifyResponse(data);
        if (!result || !result.data) {
            return;
        }

        return {
            id: result.data.buyer_id,
            status: result.data.trade_status,
        };
    } catch (e) {
        return;
    }
};

export default {
    createOrder,
    queryOrder,
    cancelOrder,
    tradeClose,
    tradeRefund,
    tradeRefundQuery,
    toaccountTransfer,
    queryTransferOrder,
    createAliPaySign,
    getUserInfoShare,
    getSystemOAuthToken,
    createWebOrderURL,
    createPageOrderURL,
    makeNotifyResponse,
};
