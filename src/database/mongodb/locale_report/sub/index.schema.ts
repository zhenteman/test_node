import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class ReportSub extends Document {
    @Prop({
        required: true,
    })
    lat: string;

    @Prop({
        required: true,
    })
    lon: string;

    @Prop()
    title: string;

    @Prop()
    address: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const ReportSubSchema = SchemaFactory.createForClass(ReportSub);
