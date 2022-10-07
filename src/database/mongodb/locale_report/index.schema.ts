import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ReportSubSchema } from './sub/index.schema';

export type LocaleReportDocument = LocaleReport & Document;

@Schema()
export class LocaleReport extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    u_id: number;

    @Prop({
        type: [ReportSubSchema],
    })
    reports: [];
}

export const LocaleReportSchema = SchemaFactory.createForClass(LocaleReport);
