import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthSubSchema } from './sub/index.schema';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    u_id: number;

    @Prop({
        enum: [0, 1],
        default: 0,
    })
    auth: number;

    @Prop({
        type: [AuthSubSchema],
    })
    data: [];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
