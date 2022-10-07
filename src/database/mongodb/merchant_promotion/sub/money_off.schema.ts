import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class MerchantMoneyOffSub extends Document {
    @Prop()
    fullness: number;

    @Prop()
    cutdown: number;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantMoneyOffSubSchema =
    SchemaFactory.createForClass(MerchantMoneyOffSub);
