import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MerchantAuthSubSchema } from './sub/index.schema';

export type MerchantAuthDocument = MerchantAuth & Document;

@Schema()
export class MerchantAuth extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        enum: [0, 1],
        default: 0,
    })
    auth: number;

    @Prop({
        type: [MerchantAuthSubSchema],
    })
    data: [];
}

export const AuthSchema = SchemaFactory.createForClass(MerchantAuth);
