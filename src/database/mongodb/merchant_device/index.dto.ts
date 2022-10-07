import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDevice {
    m_id: string;
    devices?: [];
}

export class FindDevice {
    m_id?: string;
    @ApiProperty({
        description: '设备id',
        default: '',
    })
    system_id?: string;
    @ApiProperty({
        description: '页数大小',
        default: 20,
    })
    size?: number;
    @ApiProperty({
        description: '当前页',
        default: 1,
    })
    page?: number;
    type?: number;
}

export class AddDevice {
    m_id: string;
    @ApiProperty({
        description: '极光id',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '极光id不能为空' })
    jpush: string;
    @ApiProperty({
        description: '设备id',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '设备id不能为空' })
    system_id: string;
    @ApiProperty({
        description: '系统',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '系统' })
    system: string;
    status: number;
    @ApiProperty({
        description: '设备名',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '设备名' })
    name: string;
}
