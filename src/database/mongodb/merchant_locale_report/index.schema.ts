import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MerchantReportSubSchema } from './sub/index.schema';

export type MerchantLocaleReportDocument = MerchantLocaleReport & Document;

@Schema()
export class MerchantLocaleReport extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        type: [MerchantReportSubSchema],
    })
    reports: [];
}

export const MerchantLocaleReportSchema =
    SchemaFactory.createForClass(MerchantLocaleReport);
