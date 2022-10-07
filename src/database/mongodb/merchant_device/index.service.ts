import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantDevice, MerchantDeviceDocument } from './index.schema';
import { CreateDevice, FindDevice, AddDevice } from './index.dto';

@Injectable()
export class DBMerchantDeviceService {
    constructor(
        @InjectModel('merchant_device')
        private deviceModel: Model<MerchantDeviceDocument>,
    ) {}

    // 创建设备
    async create(createDevice: CreateDevice): Promise<MerchantDevice> {
        const created = new this.deviceModel(createDevice);

        return created.save();
    }

    // 查询设备
    async find(data?: FindDevice): Promise<MerchantDevice> {
        return this.deviceModel.findOne({
            $or: [
                {
                    m_id: data.m_id,
                },
                {
                    'devices.system_id': data.system_id,
                },
            ],
        });
    }

    // 新增设备
    async add(data: AddDevice): Promise<MerchantDevice> {
        return this.deviceModel.findOneAndUpdate(
            {
                m_id: data.m_id,
            },
            {
                $push: {
                    devices: data,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新设备
    async update(data: AddDevice): Promise<MerchantDevice> {
        const devices = await this.findUidAndJpush(data);
        await this.deviceModel.updateMany(
            {
                m_id: data.m_id,
            },
            {
                $set: {
                    'devices.$[].status': 0,
                },
            },
        );

        if (devices) {
            return this.deviceModel.findOneAndUpdate(
                {
                    m_id: data.m_id,
                    'devices.system_id': data.system_id,
                },
                {
                    $set: {
                        'devices.$.status': 1,
                    },
                },
                {
                    new: true,
                },
            );
        }

        return this.add(data);
    }

    async findUidAndJpush(data: FindDevice) {
        return this.deviceModel.findOne({
            m_id: data.m_id,
            'devices.system_id': data.system_id,
        });
    }
}
