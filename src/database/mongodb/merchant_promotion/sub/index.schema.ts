import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';
import { MerchantConsumptionFreeSubSchema } from './consumption_free.schema';
import { MerchantMoneyOffSubSchema } from './money_off.schema';
import { MerchantPaySendSubSchema } from './pay_send.schema';
import { MerchantScoreDiscountSubSchema } from './score_discount.schema';

@Schema(OptionsSchema)
export class MerchantPromotionSub extends Document {
    @Prop()
    img_url: string;

    @Prop()
    web_url: string;

    // 活动状态，0：未开启，1：开启，2：停止
    @Prop({
        enum: [0, 1, 2],
        default: 0,
    })
    status: number;

    // 活动标题
    @Prop({
        default: '',
    })
    title: string;

    // 活动描述
    @Prop({
        default: '',
    })
    sub_text: string;

    // 打开方式 1：app 2：web
    @Prop({
        enum: [1, 2],
    })
    open_type: number;

    // 活动类型，1: 折扣 2: 满减 3: 满积分给折扣 4: 充多少送多少 5: 消费多少免费送
    @Prop({
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true,
    })
    type: number;

    @Prop({
        max: 10,
        min: 1,
    })
    // 折扣
    discount: number;

    // 满减
    @Prop({
        type: [MerchantMoneyOffSubSchema],
    })
    money_off: [];

    // 满积分给折扣
    @Prop({
        type: [MerchantScoreDiscountSubSchema],
    })
    score_discount: [];

    // 充值送
    @Prop({
        type: [MerchantPaySendSubSchema],
    })
    pay_send: [];

    // 消费多少免费送什么
    @Prop({
        type: [MerchantConsumptionFreeSubSchema],
    })
    consumption_free: [];

    @Prop()
    start: Date;

    @Prop()
    stop: Date;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantPromotionSubSchema =
    SchemaFactory.createForClass(MerchantPromotionSub);
