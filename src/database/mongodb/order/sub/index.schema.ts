import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class OrderSub extends Document {
    @Prop({
        required: true,
    })
    // 分类id
    class_id: string;

    @Prop({
        required: true,
    })
    // 分类名称
    class_name: string;

    @Prop({
        required: true,
    })
    // 商品id
    c_id: string;

    @Prop({
        required: true,
    })
    // 商品名称
    c_name: string;

    @Prop({
        required: true,
    })
    // 商品价格
    price: string;

    @Prop()
    // 商品编码code
    code: string;

    @Prop()
    // 活动价格或者促销价格
    discount_price: string;

    @Prop()
    // 商品图片
    image: string;

    @Prop()
    // 成本价格
    const_price: number;

    @Prop({
        required: true,
    })
    // 商品数量
    count: number;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const OrderSubSchema = SchemaFactory.createForClass(OrderSub);
