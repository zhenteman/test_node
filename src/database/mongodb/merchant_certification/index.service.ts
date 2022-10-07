import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    MerchantCertificationDocument,
    MerchantCertification,
} from './index.schema';
import { CreateDevice } from './index.dto';

@Injectable()
export class DBMerchantCertificationService {
    constructor(
        @InjectModel('merchant_certification')
        private deviceModel: Model<MerchantCertificationDocument>,
    ) {}

    // 创建设备
    async create(createDevice: CreateDevice): Promise<MerchantCertification> {
        const created = new this.deviceModel(createDevice);

        return created.save();
    }

    // 查询设备
    async find(data): Promise<MerchantCertification> {
        return this.deviceModel.findOne({
            $or: [
                {
                    m_id: data.m_id,
                },
                {
                    'certifications.system_id': data.system_id,
                },
            ],
        });
    }

    // 新增设备
    async add(data): Promise<MerchantCertification> {
        return this.deviceModel.findOneAndUpdate(
            {
                m_id: data.m_id,
            },
            {
                $push: {
                    certifications: data,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新设备
    async update(data): Promise<MerchantCertification> {
        const certifications = await this.findUidAndJpush(data);
        await this.deviceModel.updateMany(
            {
                m_id: data.m_id,
            },
            {
                $set: {
                    'certifications.$[].status': 0,
                },
            },
        );

        if (certifications) {
            return this.deviceModel.findOneAndUpdate(
                {
                    m_id: data.m_id,
                    'certifications.system_id': data.system_id,
                },
                {
                    $set: {
                        'certifications.$.status': 1,
                    },
                },
                {
                    new: true,
                },
            );
        }

        return this.add(data);
    }

    async findUidAndJpush(data) {
        return this.deviceModel.findOne({
            m_id: data.m_id,
            'certifications.system_id': data.system_id,
        });
    }
}
