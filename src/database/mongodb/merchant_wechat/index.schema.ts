import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MerchantWechatSubSchema } from './sub/index.schema';

export type MerchantWechatDocument = MerchantWechat & Document;

@Schema()
export class MerchantWechat extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        type: [MerchantWechatSubSchema],
    })
    wechats: [];
}

export const MerchantWechatSchema =
    SchemaFactory.createForClass(MerchantWechat);
