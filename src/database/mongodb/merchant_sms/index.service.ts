import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantSms, MerchantSmsDocument } from './index.schema';
import { CreateSms, FindSms, UpdateSms } from './index.dto';

@Injectable()
export class DBMerchantSmsService {
    constructor(
        @InjectModel('merchant_sms')
        private smsModel: Model<MerchantSmsDocument>,
    ) {}

    // 创建短信
    async create(createSms: CreateSms): Promise<MerchantSms> {
        const created = new this.smsModel(createSms);
        return created.save();
    }

    // 查询短信
    async find(data: FindSms): Promise<MerchantSms> {
        return this.smsModel.findOne(data);
    }

    // 更新短信
    async update(data: UpdateSms): Promise<MerchantSms> {
        return this.smsModel.findOneAndUpdate(
            {
                phone: data.phone,
                type: data.type,
            },
            {
                $set: {
                    code: data.code,
                },
            },
            {
                new: true,
            },
        );
    }
}
