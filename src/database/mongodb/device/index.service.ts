import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from './index.schema';
import { CreateDevice, FindDevice, AddDevice } from './index.dto';

@Injectable()
export class DBDeviceService {
    constructor(
        @InjectModel('device')
        private deviceModel: Model<DeviceDocument>,
    ) {}

    // 创建设备
    async create(createDevice: CreateDevice): Promise<Device> {
        const created = new this.deviceModel(createDevice);

        return created.save();
    }

    // 查询设备
    async find(data?: FindDevice): Promise<Device> {
        return this.deviceModel.findOne({
            $or: [
                {
                    u_id: data.u_id,
                },
                {
                    'devices.system_id': data.system_id,
                },
            ],
        });
    }

    // 新增设备
    async add(data: AddDevice): Promise<Device> {
        return this.deviceModel.findOneAndUpdate(
            {
                u_id: data.u_id,
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
    async update(data: AddDevice): Promise<Device> {
        const devices = await this.findUidAndJpush(data);
        await this.deviceModel.updateMany(
            {
                u_id: data.u_id,
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
                    u_id: data.u_id,
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
            u_id: data.u_id,
            'devices.system_id': data.system_id,
        });
    }
}
