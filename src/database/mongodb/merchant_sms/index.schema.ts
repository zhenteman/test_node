import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type MerchantSmsDocument = MerchantSms & Document;

@Schema(OptionsSchema)
export class MerchantSms extends Document {
    @Prop({
        required: true,
    })
    m_id: string;

    @Prop({
        required: true,
    })
    phone: string;

    @Prop({
        enum: ['registry', 'statement', 'withdraw'],
        required: true,
    })
    type: string;

    @Prop({
        required: true,
    })
    code: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
        index: {
            expires: 300,
        },
    })
    updated_time: Date;
}

export const MerchantSmsSchema = SchemaFactory.createForClass(MerchantSms);
