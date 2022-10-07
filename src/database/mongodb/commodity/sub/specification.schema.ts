import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class SpecificationSub extends Document {
    @Prop()
    // 宽
    width: string;

    @Prop()
    // 高
    height: string;

    @Prop()
    // 克
    gram: string;

    @Prop()
    // 长
    long: string;

    @Prop()
    // 毫升
    ml: string;

    @Prop()
    // 重量
    weight: string;

    @Prop()
    // 数量 1个、1箱、1瓶等等
    count: string;

    @Prop()
    // 数量的单位，个、箱、瓶等等
    count_unit: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const SpecificationSubSchema =
    SchemaFactory.createForClass(SpecificationSub);
