// eslint-disable-next-line @typescript-eslint/no-var-requires
const tenpay = require('tenpay');
import { WECHATPAY } from '../config/pay.config';

const api = new tenpay(WECHATPAY);

// 统一下单
const unifiedOrder = async (data) => {
    try {
        const { prepay_id, code_url } = await api.unifiedOrder({
            out_trade_no: data.id,
            body: data.desc,
            total_fee: data.price,
            trade_type: 'APP',
            product_id: data.id,
            desc: data.desc,
            openid: data.openid,
        });

        return {
            prepay_id,
            code_url,
        };
    } catch (e) {
        console.log(e);
        return false;
    }
};

const orderAppPay = async (data) => {
    try {
        const result = await api.getAppParams({
            out_trade_no: data.id,
            body: data.desc,
            total_fee: data.price,
            desc: data.desc,
        });

        return result;
    } catch (e) {
        console.log(e);
        return false;
    }
};

// 订单查询
const orderQuery = async (id) => {
    const result = await api.orderQuery({
        out_trade_no: id,
    });

    console.log(result);
};

// 撤销订单
const reverse = async (id) => {
    const result = await api.reverse({
        out_trade_no: id,
    });

    console.log(result);
};

// 申请退款
const refund = async (data) => {
    try {
        const result = await api.refund({
            transaction_id: data.id,
            out_refund_no: data.refundId,
            total_fee: data.total,
            refund_fee: data.refund,
        });

        console.log(result);
        return true;
    } catch (e) {
        return false;
    }
};

// 关闭订单
const closeOrder = async (id) => {
    const result = await api.closeOrder({
        out_trade_no: id,
    });

    console.log(result);
};

// 查询退款
const refundQuery = async (id) => {
    const result = await api.refundQuery({
        refund_id: id,
    });

    console.log(result);
};

// 企业付款
const transfers = async (data) => {
    try {
        const result = await api.transfers({
            partner_trade_no: data.id,
            openid: data.openid,
            re_user_name: data.name,
            amount: data.amount,
            desc: data.desc,
        });

        console.log(result);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

// 查询企业付款
const transfersQuery = async (id) => {
    const result = await api.transfersQuery({
        partner_trade_no: id,
    });

    console.log(result);
};

// 企业付款到银行卡
const payBank = async (data) => {
    try {
        const result = await api.payBank({
            partner_trade_no: data.id,
            bank_code: data.code,
            enc_bank_no: data.bank_no,
            enc_true_name: data.name,
            amount: data.amount,
            desc: data.desc,
        });

        console.log(result);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

// 查询企业付款到银行卡
const queryBank = async (id) => {
    const result = await api.queryBank({
        partner_trade_no: id,
    });

    console.log(result);
};

// 发送普通红包
const sendRedpack = async (data) => {
    try {
        const result = await api.sendRedpack({
            mch_billno: data.id,
            send_name: data.name,
            re_openid: data.openid,
            total_amount: data.amount,
            wishing: data.wish,
            act_name: data.actName,
            remark: data.remark,
        });

        console.log(result);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

// 查询红包记录
const redpackQuery = async (id) => {
    const result = await api.redpackQuery({
        mch_billno: id,
    });

    console.log(result);
};

// 发送裂变红包
const sendGroupRedpack = async (data) => {
    try {
        const result = await api.sendGroupRedpack({
            mch_billno: data.id,
            send_name: data.name,
            re_openid: data.openid,
            total_amount: data.amount,
            wishing: data.wish,
            act_name: data.actName,
            remark: data.remark,
        });

        console.log(result);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
// 小程序支付
const getPayParams = async (data) => {
    try {
        const result = await api.getPayParams({
            out_trade_no: data.id,
            body: data.desc,
            total_fee: data.price,
            openid: data.openid,
            desc: data.desc,
        });

        return result;
    } catch (error) {
        return false;
    }
};

export default {
    sendGroupRedpack,
    sendRedpack,
    unifiedOrder,
    orderQuery,
    redpackQuery,
    refund,
    refundQuery,
    reverse,
    queryBank,
    payBank,
    transfersQuery,
    transfers,
    closeOrder,
    getPayParams,
    orderAppPay,
};
