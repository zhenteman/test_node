import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';
import { SpecificationSubSchema } from './specification.schema';

@Schema(OptionsSchema)
export class CommoditySub extends Document {
    @Prop({
        required: true,
    })
    // 商户的id或者是个人id(如闲鱼售卖商品的个人id)
    id: string;

    @Prop({
        required: true,
    })
    // 分类id
    class_id: string;

    @Prop()
    // 商品编码code
    code: string;

    @Prop()
    // 月售
    month_sales: string;

    @Prop()
    // 月销排行榜
    top_sales: string;

    @Prop()
    // 商品描述
    describe: string;

    @Prop({
        required: true,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5, 6],
    })
    // 商品状态 0: 审核中 1：审核成功 2：审核失败 3：已上架 4： 已下架
    status: number;

    @Prop()
    // 是否置顶
    is_stick: boolean;

    @Prop({
        type: [SpecificationSubSchema],
    })
    // 商品规格
    specification: [];

    @Prop({
        required: true,
    })
    // 商品实际售卖价格
    price: number;

    @Prop()
    // 成本价格
    const_price: number;

    @Prop()
    // 建议价格
    suggest_price: number;

    @Prop()
    // 商标/品牌名称
    trade_mark: string;

    @Prop()
    // 厂商
    manu_name: string;

    @Prop()
    // 商品是否搞活动或者促销
    is_promotion: boolean;

    @Prop()
    // 活动价格或者促销价格
    discount_price: string;

    @Prop()
    // 商品图片
    image: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const CommoditySubSchema = SchemaFactory.createForClass(CommoditySub);
