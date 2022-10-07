import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ActivitySubSchema } from './sub/index.schema';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity extends Document {
    @Prop({
        default: 'activity',
    })
    id: string;

    @Prop({
        type: [ActivitySubSchema],
    })
    activities: [];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
