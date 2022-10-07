import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MerchantDeviceSubSchema } from './sub/index.schema';

export type MerchantDeviceDocument = MerchantDevice & Document;

@Schema()
export class MerchantDevice extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        type: [MerchantDeviceSubSchema],
    })
    devices: [];
}

export const MerchantDeviceSchema =
    SchemaFactory.createForClass(MerchantDevice);
