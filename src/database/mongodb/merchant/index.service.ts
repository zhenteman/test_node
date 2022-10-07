import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Merchant, MerchantDocument } from './index.schema';
import * as userDto from './index.dto';
import { formatTime, reputedUser } from 'src/utils/validate';

@Injectable()
export class DBMerchantService {
    constructor(
        @InjectModel('merchant') private userModel: Model<MerchantDocument>,
    ) {}

    async create(createUser: userDto.CreateUser) {
        const created = new this.userModel({
            ...createUser,
            j_id: createUser.m_id,
        });

        return created.save();
    }

    patchJpushId(m_id, id) {
        return this.userModel.findOneAndUpdate(
            {
                m_id,
            },
            {
                $set: {
                    jr_id: id,
                },
            },
        );
    }

    findJrIdByMid(m_id) {
        return this.userModel.findOne({
            m_id,
        });
    }

    // 查找最后一个用户
    async findUserCount(): Promise<number> {
        const count = await this.userModel.find().count();
        return count + 1;
    }

    async getMerchantInfo(m_id) {
        const data = await this.userModel
            .findOne({
                m_id,
            })
            .populate({
                path: 'auth reputation report device wallet promotion certification wechat alipay',
                select: {
                    _id: 0,
                    updated_time: 0,
                    created_time: 0,
                    phone: 0,
                    __v: 0,
                    j_id: 0,
                    password: 0,
                    report: 0,
                },
            });

        if (!data) {
            return;
        }

        let device = data.device['devices'] || [];
        device = device.map(
            (item: {
                system: string;
                name: string;
                status: number;
                created_time: Date;
            }) => ({
                name: item.name,
                system: item.system,
                status: item.status,
                time: formatTime(item.created_time),
            }),
        );

        let wechat = data.wechat['wechats'] || [];
        wechat = wechat.filter((item) => item.type === 1);
        [wechat] = wechat.slice(-1);

        let alipay = data.alipay['alipays'] || [];
        alipay = alipay.filter((item) => item.type === 1);
        [alipay] = alipay.slice(-1);

        const certifications = data.certification['certifications'] || [];
        const promotion = data.promotion['promotions'] || [];
        const reputation = data.reputation;

        return {
            vip: data['vip'],
            status: data['status'],
            area: data['area'],
            m_name: data['m_name'],
            m_id: data['m_id'],
            j_password: data['j_password'],
            merchant_name: data['merchant_name'],
            delivery_rule: data['delivery_rule'],
            avatar: data['avatar'],
            describe: data['describe'],
            open_hours: data['open_hours'],
            stop_hours: data['stop_hours'],
            service_phone: data['service_phone'],
            auth: data['auth']['auth'],
            device,
            reputation,
            certifications,
            promotion,
            wechat,
            alipay,
            wallet: data.wallet,
        };
    }

    // 查找提交的最新用户
    async findAll(phone): Promise<string> {
        const [user] = await this.userModel
            .find({
                phone,
                status: 0,
            })
            .sort({
                _id: -1,
            })
            .limit(1);
        if (user) {
            return user.m_id;
        }

        return '';
    }

    // 查找用户
    async find(data): Promise<Merchant> {
        return this.userModel.findOne(data);
    }

    // 查找具体商家根据状态
    async findByStatus(m_id): Promise<Merchant> {
        return this.userModel.findOne({
            m_id,
            $or: [
                {
                    status: 2,
                },
                {
                    status: 3,
                },
            ],
        });
    }

    // 查找用户
    async findAllMerchant(data) {
        return this.userModel
            .find({
                $or: [
                    {
                        status: 2,
                    },
                    {
                        status: 3,
                    },
                ],
            })
            .skip((data.page - 1) * data.size)
            .sort({ created_time: -1 })
            .limit(Number(data.size));
    }

    // 查找用户_id
    async find_Id(data: { m_id: string }): Promise<Merchant> {
        return this.userModel.findOne(data);
    }

    // 查找用户 m_id
    async findById(data: userDto.FindUserById): Promise<userDto.CreateUser> {
        const select = {
            _id: 0,
            updated_time: 0,
            created_time: 0,
            phone: 0,
            __v: 0,
            j_id: 0,
            m_id: 0,
            password: 0,
            report: 0,
        };
        const user = await this.userModel.findOne(data, select).populate({
            path: 'auth reputation device wallet wechat alipay',
            select,
        });

        return reputedUser(user);
    }

    // 更新用户名
    async updateName(data: userDto.UpdateName): Promise<Merchant> {
        return this.userModel.findOneAndUpdate(
            {
                m_id: data.m_id,
            },
            {
                $set: {
                    m_name: data.m_name,
                },
            },
            {
                new: true,
            },
        );
    }

    // 更新头像
    async updateAvatar(data: userDto.UpdateAvatar): Promise<Merchant> {
        return this.userModel.findOneAndUpdate(
            {
                m_id: data.m_id,
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
    async updatePhone(data: userDto.UpdatePhone): Promise<Merchant> {
        return this.userModel.findOneAndUpdate(
            {
                m_id: data.m_id,
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
    async updatePassword(data: userDto.UpdatePassword): Promise<Merchant> {
        return this.userModel.findOneAndUpdate(
            {
                m_id: data.m_id,
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
    async updateStatus(data: userDto.UpdateStatus): Promise<Merchant> {
        return this.userModel.findOneAndUpdate(
            {
                m_id: data.m_id,
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
    async updateVip(data: userDto.UpdateVip): Promise<Merchant> {
        return this.userModel.findOneAndUpdate(
            {
                m_id: data.m_id,
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
    async updateAuth(data): Promise<Merchant> {
        return this.userModel.findOneAndUpdate(
            {
                m_id: data.m_id,
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

    // 审核时候的提交信息
    async updateAudit(m_id, body) {
        return this.userModel.findOneAndUpdate(
            {
                m_id,
                status: 0,
            },
            {
                $set: body,
            },
            {
                new: true,
            },
        );
    }
}
