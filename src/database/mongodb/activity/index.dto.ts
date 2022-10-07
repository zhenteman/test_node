import { ObjectId } from 'mongoose';

interface Activity {
    img_url: string;
    type: number;
    web_url: string;
    status: string;
    start: Date;
    stop: Date;
}

export class CreateActivity {
    activities: [Activity];
}

export class FindActivity {
    _id?: ObjectId;
    id?: string;
    type?: number;
    status?: number;
    start?: Date;
    stop?: Date;
}

export class UpdateActivity {
    _id: ObjectId;
    status?: number;
    stop?: Date;
    start?: Date;
}
