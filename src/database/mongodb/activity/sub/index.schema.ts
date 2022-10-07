import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../../schemas/options.schema';

@Schema(OptionsSchema)
export class ActivitySub extends Document {
    @Prop({
        required: true,
    })
    img_url: string;

    @Prop({
        required: true,
    })
    web_url: string;

    // 活动状态，0：未开启，1：开启，2：停止
    @Prop({
        enum: [0, 1, 2],
        default: 0,
    })
    status: number;

    // 活动标题
    @Prop({
        default: '',
    })
    title: string;

    // 活动描述
    @Prop({
        default: '',
    })
    sub_text: string;

    // 1：app 2：web
    @Prop({
        enum: [1, 2],
    })
    type: number;

    @Prop()
    start: Date;

    @Prop()
    stop: Date;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const ActivitySubSchema = SchemaFactory.createForClass(ActivitySub);
