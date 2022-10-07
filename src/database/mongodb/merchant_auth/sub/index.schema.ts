import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class MerchantAuthSub extends Document {
    @Prop()
    score: string;

    @Prop()
    name: string;

    @Prop()
    idcard: string;

    @Prop()
    image_id: string;

    @Prop()
    order_no: string;

    @Prop()
    req_id: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantAuthSubSchema =
    SchemaFactory.createForClass(MerchantAuthSub);
