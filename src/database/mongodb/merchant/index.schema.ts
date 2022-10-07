import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type MerchantDocument = Merchant & Document;

@Schema(OptionsSchema)
export class Merchant extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    // 联系人姓名
    @Prop()
    m_name: string;

    // 店铺名称
    @Prop()
    merchant_name: string;

    // 配送规则，满多少才可以配送
    @Prop()
    delivery_rule: string;

    @Prop()
    // 人均消费
    per_capita: string;

    @Prop()
    // 月售
    month_sales: string;

    // 配送费用，可以是商铺自己定义，也可以是平台算
    @Prop()
    delivery_price: string;

    @Prop()
    avatar: string;

    @Prop()
    describe: string;

    @Prop({
        required: true,
    })
    phone: string;

    @Prop()
    lon: string;

    @Prop()
    lat: string;

    // 区域
    @Prop()
    area: string;

    // 开门时间
    @Prop()
    open_hours: string;

    // 关门时间
    @Prop()
    stop_hours: string;

    @Prop()
    password: string;

    @Prop()
    // 极光的id
    jr_id: string;

    // 0: 已提交 1: 审核中 2: 正常 3: 停业 4: 冻结 5: 封禁 6: 审核失败 7: 商家审核成功待上传材料 8: 不合作
    @Prop({
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        default: 0,
    })
    status: number;

    // 对外客服电话
    @Prop()
    service_phone: string;

    // 0: 未开通会员 1: 普通会员 2: 高级会员 3: 超级会员 4: 至尊会员
    @Prop({
        enum: [0, 1, 2, 3, 4],
        default: 0,
    })
    vip: number;

    @Prop({
        unique: true,
    })
    j_id: string;

    @Prop()
    bank_card: string;

    @Prop({
        default: 'jq+/app2022|up',
    })
    j_password: string;

    @Prop({
        ref: 'merchant_device',
        type: SchemaTypes.ObjectId,
    })
    device: Types.ObjectId;

    // 商家资质
    @Prop({
        ref: 'merchant_certification',
        type: SchemaTypes.ObjectId,
    })
    certification: Types.ObjectId;

    @Prop({
        ref: 'merchant_auth',
        type: SchemaTypes.ObjectId,
    })
    auth: Types.ObjectId;

    @Prop({
        ref: 'merchant_wallet',
        type: SchemaTypes.ObjectId,
    })
    wallet: Types.ObjectId;

    @Prop({
        ref: 'merchant_locale_report',
        type: SchemaTypes.ObjectId,
    })
    report: Types.ObjectId;

    @Prop({
        ref: 'merchant_reputation',
        type: SchemaTypes.ObjectId,
    })
    reputation: Types.ObjectId;

    @Prop({
        ref: 'merchant_wechat',
        type: SchemaTypes.ObjectId,
    })
    wechat: Types.ObjectId;

    @Prop({
        ref: 'merchant_promotion',
        type: SchemaTypes.ObjectId,
    })
    promotion: Types.ObjectId;

    @Prop({
        ref: 'merchant_alipay',
        type: SchemaTypes.ObjectId,
    })
    alipay: Types.ObjectId;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const SchemaName = 'merchant';
export const MerchantSchema = SchemaFactory.createForClass(Merchant);
