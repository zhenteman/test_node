import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type SmsDocument = Sms & Document;

@Schema(OptionsSchema)
export class Sms extends Document {
    @Prop({
        required: true,
    })
    u_id: number;

    @Prop({
        required: true,
    })
    phone: string;

    @Prop({
        enum: ['sign', 'statement', 'withdraw'],
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

export const SmsSchema = SchemaFactory.createForClass(Sms);
