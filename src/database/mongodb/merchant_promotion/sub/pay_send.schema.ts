import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class MerchantPaySendSub extends Document {
    @Prop()
    pay: number;

    @Prop()
    send: number;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantPaySendSubSchema =
    SchemaFactory.createForClass(MerchantPaySendSub);
