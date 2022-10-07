import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class MerchantDeviceSub extends Document {
    @Prop({
        required: true,
        default: '',
    })
    jpush: string;

    @Prop({
        default: '',
        required: true,
    })
    system: string;

    @Prop({
        required: true,
    })
    system_id: string;

    @Prop({
        default: '',
        required: true,
    })
    name: string;

    // 0: 不是当前设备 1: 当前设备
    @Prop({
        enum: [0, 1],
        default: 1,
    })
    status: number;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantDeviceSubSchema =
    SchemaFactory.createForClass(MerchantDeviceSub);
