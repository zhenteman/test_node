import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BarcodeDocument } from './index.schema';

@Injectable()
export class DBBarcodeService {
    constructor(
        @InjectModel('barcode') private barcodeModel: Model<BarcodeDocument>,
    ) {}

    findCode(code) {
        return this.barcodeModel.findOne(
            {
                code,
            },
            {
                _id: 0,
                updated_time: 0,
                created_time: 0,
                __v: 0,
            },
        );
    }

    updateCode(code, body) {
        return this.barcodeModel.findOneAndUpdate(
            {
                code,
            },
            {
                $set: body,
            },
            {
                new: true,
                upsert: true,
            },
        );
    }
}
