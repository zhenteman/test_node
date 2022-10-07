import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './index.schema';
import * as userDto from './index.dto';
import { reputedUser } from 'src/utils/validate';

@Injectable()
export class DBUserService {
    constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

    async create(createUser: userDto.CreateUser) {
        const created = new this.userModel({
            ...createUser,
            j_id: createUser.u_id,
        });

        return created.save();
    }

    // 查找最后一个用户
    async findUserCount(): Promise<number> {
        const count = await this.userModel.find().count();
        return count + 1;
    }

    // 查找用户
    async find(data: userDto.FindUser): Promise<User> {
        return this.userModel.findOne(data);
    }

    // 查找用户_id
    async find_Id(data: { u_id: number }): Promise<User> {
        return this.userModel.findOne(data);
    }

    // 查找用户 u_id
    async findById(data: userDto.FindUserById): Promise<userDto.CreateUser> {
        const select = {
            _id: 0,
            updated_time: 0,
            created_time: 0,
            phone: 0,
            __v: 0,
            j_id: 0,
            u_id: 0,
            password: 0,
            report: 0,
        };
        const user = await this.userModel.findOne(data, select).populate({
            path: 'skills auth reputation device shop stroke wallet wechat alipay profession',
            select,
        });

        return reputedUser(user);
    }

    // 更新年龄
    async updateAge(data: userDto.UpdateAge): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    age: data.age,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新性别
    async updateSex(data: userDto.UpdateSex): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    sex: data.sex,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新用户名
    async updateName(data: userDto.UpdateName): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    u_name: data.u_name,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新头像
    async updateAvatar(data: userDto.UpdateAvatar): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    avatar: data.avatar,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新手机号
    async updatePhone(data: userDto.UpdatePhone): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    phone: data.phone,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新密码
    async updatePassword(data: userDto.UpdatePassword): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    password: data.password,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新状态
    async updateStatus(data: userDto.UpdateStatus): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    status: data.status,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新vip值
    async updateVip(data: userDto.UpdateVip): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    vip: data.vip,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新认证信息
    async updateAuth(data): Promise<User> {
        return this.userModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: {
                    auth: data.auth,
                },
            },
            {
                new: true,
            },
        );
    }
}
