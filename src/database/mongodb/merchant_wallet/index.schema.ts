import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type MerchantWalletDocument = MerchantWallet & Document;

@Schema(OptionsSchema)
export class MerchantWallet extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    m_id: string;

    @Prop({
        default: 0,
    })
    balance: number;

    // 1正常 2冻结
    @Prop({
        enum: [1, 2],
        default: 1,
    })
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

export const MerchantWalletSchema =
    SchemaFactory.createForClass(MerchantWallet);
