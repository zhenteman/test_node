import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateUser {
    u_name?: string;
    age?: number;
    u_id?: number;
    sex?: number;
    avatar?: string;
    phone: string;
    password?: string;
    j_id?: string;
    j_password?: string;
    status?: number;
    vip?: number;
    auth?: ObjectId;
    reputation?: ObjectId;
    report?: ObjectId;
    device?: ObjectId;
    wallet?: ObjectId;
    wechat?: ObjectId;
    alipay?: ObjectId;
}

export class FindUser {
    @ApiProperty({
        description: '手机号',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '手机号不能为空' })
    phone: string;

    @ApiProperty({
        description: '密码',
        default: '',
        required: false,
    })
    password?: string;

    @ApiProperty({
        description: '类型',
        enum: [1, 2],
        default: 0,
    })
    type?: number;
}

export class FindUserById {
    u_id: number;
}

export class UpdateAge {
    @ApiProperty({
        description: '年龄',
        required: true,
        maximum: 100,
        minimum: 16,
        default: 0,
    })
    @IsNotEmpty({ message: '年龄不能为空' })
    age: number;
    u_id: number;
}

export class UpdateName {
    @ApiProperty({
        description: '用户名',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '用户名不能为空' })
    u_name: string;
    u_id: number;
}

export class UpdateSex {
    @ApiProperty({
        description: '性别',
        required: true,
        default: 0,
    })
    @IsNotEmpty({ message: '性别不能为空' })
    sex: number;
    u_id: number;
}

export class UpdateAvatar {
    @ApiProperty({
        description: '头像',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '头像不能为空' })
    avatar: string;
    u_id: number;
}

export class UpdatePhone {
    phone: string;
    u_id: number;
}

export class UpdatePassword {
    @ApiProperty({
        description: '密码',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;
    u_id: number;
}

export class UpdateJPassword {
    j_password: string;
    u_id: number;
}

export class UpdateStatus {
    @ApiProperty({
        description: '状态',
        required: true,
        default: 0,
    })
    @IsNotEmpty({ message: '状态不能为空' })
    status: number;
    u_id: number;
}

export class UpdateVip {
    vip: number;
    u_id: number;
}
