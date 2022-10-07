import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class ClassifySub extends Document {
    @Prop({
        required: true,
        unique: true,
    })
    id: string;

    @Prop({
        required: true,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5, 6],
    })
    // 分类状态 0: 审核中 1：审核成功 2：审核失败 3：已上架 4： 已下架
    status: number;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const ClassifySubSchema = SchemaFactory.createForClass(ClassifySub);
