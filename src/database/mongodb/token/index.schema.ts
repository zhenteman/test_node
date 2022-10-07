import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type TokenDocument = Token & Document;

@Schema(OptionsSchema)
export class Token extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    u_id: number;

    @Prop({
        unique: true,
        required: true,
    })
    token: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
