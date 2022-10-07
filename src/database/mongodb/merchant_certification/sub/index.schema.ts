import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class MerchantCertificationSub extends Document {
    @Prop({
        required: true,
        default: '',
    })
    c_name: string;

    @Prop({
        default: '',
        required: true,
    })
    start_time: string;

    @Prop({
        default: '',
    })
    end_time: string;

    @Prop({
        required: true,
    })
    url: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantCertificationSubSchema = SchemaFactory.createForClass(
    MerchantCertificationSub,
);
