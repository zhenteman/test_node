import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class MerchantWechatSub extends Document {
    @Prop({
        required: true,
    })
    user_id: string;

    @Prop()
    union_id: string;

    @Prop()
    nickname: string;

    @Prop({
        enum: [0, 1, 2],
        default: 0,
    })
    sex: number;

    @Prop()
    province: string;

    @Prop()
    city: string;

    @Prop()
    country: string;

    @Prop()
    avatar: string;

    @Prop({
        required: true,
    })
    code: string;

    // 1：授权 2：登录
    @Prop({
        enum: [1, 2],
    })
    type: number;

    @Prop()
    access_token: string;

    @Prop()
    refresh_token: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantWechatSubSchema =
    SchemaFactory.createForClass(MerchantWechatSub);
