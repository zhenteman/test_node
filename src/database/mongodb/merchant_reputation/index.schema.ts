import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type MerchantReputationDocument = MerchantReputation & Document;

@Schema(OptionsSchema)
export class MerchantReputation extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    // 订单数量
    @Prop({
        default: 0,
    })
    order: number;

    // 好评率
    @Prop({
        max: 100,
        min: 0,
        default: 0,
    })
    praise: number;

    // 星级
    @Prop({
        default: 5,
        max: 5,
        min: 0,
    })
    star: number;

    // 举报
    @Prop({
        default: 0,
    })
    report: number;

    // 被举报
    @Prop({
        default: 0,
    })
    be_report: number;

    // 评价
    @Prop({
        default: 0,
    })
    evaluate: number;

    // 被评价
    @Prop({
        default: 0,
    })
    be_evaluate: number;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const MerchantReputationSchema =
    SchemaFactory.createForClass(MerchantReputation);
