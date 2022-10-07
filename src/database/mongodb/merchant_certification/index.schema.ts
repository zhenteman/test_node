import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MerchantCertificationSubSchema } from './sub/index.schema';

export type MerchantCertificationDocument = MerchantCertification & Document;

@Schema()
export class MerchantCertification extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        type: [MerchantCertificationSubSchema],
    })
    certifications: [];
}

export const MerchantCertificationSchema = SchemaFactory.createForClass(
    MerchantCertification,
);
