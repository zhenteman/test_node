import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MerchantAlipaySubSchema } from './sub/index.schema';

export type MerchantAlipayDocument = MerchantAlipay & Document;

@Schema()
export class MerchantAlipay extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        type: [MerchantAlipaySubSchema],
    })
    alipays: [];
}

export const MerchantAlipaySchema =
    SchemaFactory.createForClass(MerchantAlipay);
