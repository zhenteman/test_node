import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AlipaySubSchema } from './sub/index.schema';

export type AlipayDocument = Alipay & Document;

@Schema()
export class Alipay extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    u_id: number;

    @Prop({
        type: [AlipaySubSchema],
    })
    alipays: [];
}

export const AlipaySchema = SchemaFactory.createForClass(Alipay);
