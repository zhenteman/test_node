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
    m_id: string;
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
