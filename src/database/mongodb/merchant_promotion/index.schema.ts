import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MerchantPromotionSubSchema } from './sub/index.schema';

export type MerchantPromotionDocument = MerchantPromotion & Document;

@Schema()
export class MerchantPromotion extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        type: [MerchantPromotionSubSchema],
    })
    promotions: [];
}

export const MerchantPromotionSchema =
    SchemaFactory.createForClass(MerchantPromotion);
