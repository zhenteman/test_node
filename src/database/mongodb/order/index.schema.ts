import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { OrderSubSchema } from './sub/index.schema';
import OptionsSchema from '../schemas/options.schema';

export type OrderDocument = Order & Document;

@Schema(OptionsSchema)
export class Order extends Document {
    // 订单id
    @Prop({
        unique: true,
    })
    o_id: number;

    // 下单人id, 有可能是个人，也有可能是商户
    @Prop({
        required: true,
    })
    u_id: string;

    // 下单人的数据库关联id
    @Prop({
        ref: 'user',
        type: SchemaTypes.ObjectId,
    })
    user: Types.ObjectId;

    // 商户的数据库关联id
    @Prop({
        ref: 'merchant',
        type: SchemaTypes.ObjectId,
    })
    merchant: Types.ObjectId;

    // 微信退款id
    @Prop()
    wx_r_id: string;

    // 商铺id
    @Prop({
        required: true,
    })
    m_id: string;

    // 总价格
    @Prop()
    price: number;

    // 类型 1：店内点餐 2：外卖 3：采购
    @Prop({
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    })
    type: number;

    // 状态 1：已点餐商家未确认 2：商家已确认 3：骑手接单中 4：骑手已接单 5：配送中 6：配送完成骑手已确认 7：用户收货确认 8：店内点餐用户付款后商家点击结账代表已出账 9: 退款中 10: 退款成功 11: 退款失败
    @Prop({
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    })
    status: number;

    // 支付状态 1：未支付 2：已支付 3：支付失败 4：支付超时 5：店内点餐不需要支付
    @Prop({
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    })
    pay_status: number;

    // 支付宝或微信事件返回唯一id
    @Prop()
    t_id: string;

    // 支付的账号id
    @Prop()
    open_id: string;

    // 支付方式 1：支付宝 2：微信 3：银联 4：杉德 5：易宝 6：连连 10：店内不需要支付
    @Prop({
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    })
    pay_type: number;

    @Prop({
        type: [OrderSubSchema],
    })
    orders: [];

    @Prop()
    pay_time: Date;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
