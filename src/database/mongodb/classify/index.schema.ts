import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClassifySubSchema } from './sub/index.schema';

export type ClassifyDocument = Classify & Document;

@Schema()
export class Classify extends Document {
    @Prop({
        unique: true,
        required: true,
    })
    c_name: string;

    @Prop({
        unique: true,
        required: true,
    })
    c_id: number;

    @Prop({
        type: [ClassifySubSchema],
    })
    ids: [];
}

export const ClassifySchema = SchemaFactory.createForClass(Classify);
