import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WechatSubSchema } from './sub/index.schema';

export type WechatDocument = Wechat & Document;

@Schema()
export class Wechat extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    u_id: number;

    @Prop({
        type: [WechatSubSchema],
    })
    wechats: [];
}

export const WechatSchema = SchemaFactory.createForClass(Wechat);
