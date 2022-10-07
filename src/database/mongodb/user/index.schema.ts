import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type UserDocument = User & Document;

@Schema(OptionsSchema)
export class User extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    u_id: number;

    @Prop()
    u_name: string;

    @Prop()
    age: number;

    // 0: 未设置 1: 男 2: 女
    @Prop({
        enum: [0, 1, 2],
        default: 0,
    })
    sex: number;

    @Prop()
    avatar: string;

    @Prop({
        unique: true,
        required: true,
    })
    phone: string;

    @Prop()
    password: string;

    // 0: 未在线 1: 在线 2: 冻结 3: 封禁
    @Prop({
        enum: [0, 1, 2, 3],
        default: 0,
    })
    status: number;

    // 0: 未开通会员 1: 普通会员 2: 高级会员 3: 超级会员 4: 至尊会员
    @Prop({
        enum: [0, 1, 2, 3, 4],
        default: 0,
    })
    vip: number;

    @Prop({
        unique: true,
    })
    j_id: number;

    @Prop({
        default: 'jq+/app2022|up',
    })
    j_password: string;

    @Prop({
        ref: 'device',
        type: SchemaTypes.ObjectId,
    })
    device: Types.ObjectId;

    @Prop({
        ref: 'auth',
        type: SchemaTypes.ObjectId,
    })
    auth: Types.ObjectId;

    @Prop({
        ref: 'wallet',
        type: SchemaTypes.ObjectId,
    })
    wallet: Types.ObjectId;

    @Prop({
        ref: 'locale_report',
        type: SchemaTypes.ObjectId,
    })
    report: Types.ObjectId;

    @Prop({
        ref: 'reputation',
        type: SchemaTypes.ObjectId,
    })
    reputation: Types.ObjectId;

    @Prop({
        ref: 'wechat',
        type: SchemaTypes.ObjectId,
    })
    wechat: Types.ObjectId;

    @Prop({
        ref: 'alipay',
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

export const SchemaName = 'user';
export const UserSchema = SchemaFactory.createForClass(User);
