import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type WalletDocument = Wallet & Document;

@Schema(OptionsSchema)
export class Wallet extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    u_id: number;

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

export const WalletSchema = SchemaFactory.createForClass(Wallet);
