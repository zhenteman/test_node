import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class MerchantConsumptionFreeSub extends Document {
    @Prop()
    consumption: number;

    @Prop()
    free: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantConsumptionFreeSubSchema = SchemaFactory.createForClass(
    MerchantConsumptionFreeSub,
);
