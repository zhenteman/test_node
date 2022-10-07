import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommoditySubSchema } from './sub/index.schema';

export type CommodityDocument = Commodity & Document;

@Schema()
export class Commodity extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    // 商品名称（如冰红茶）
    c_name: string;

    @Prop({
        unique: true,
        required: true,
    })
    // 商品id
    c_id: number;

    @Prop({
        type: [CommoditySubSchema],
    })
    commodity: [];
}

export const CommoditySchema = SchemaFactory.createForClass(Commodity);
