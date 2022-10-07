import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DeviceSubSchema } from './sub/index.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    u_id: number;

    @Prop({
        type: [DeviceSubSchema],
    })
    devices: [];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
