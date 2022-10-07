import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLocaleReport {
    m_id: string;
    reports?: [];
}

export class FindLocaleReport {
    m_id: string;
}

export class AddLocalReport {
    m_id: string;
    @ApiProperty({
        description: '坐标点',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '坐标点' })
    lat: string;
    @ApiProperty({
        description: '坐标点',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '坐标点' })
    lon: string;
    @ApiProperty({
        description: '标题',
        default: '',
    })
    title?: string;
    @ApiProperty({
        description: '详细地址',
        default: '',
    })
    address?: string;
}
