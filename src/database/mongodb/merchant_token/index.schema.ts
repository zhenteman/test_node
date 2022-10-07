import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type MerchantTokenDocument = MerchantToken & Document;

@Schema(OptionsSchema)
export class MerchantToken extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        unique: true,
        required: true,
    })
    token: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantTokenSchema = SchemaFactory.createForClass(MerchantToken);
