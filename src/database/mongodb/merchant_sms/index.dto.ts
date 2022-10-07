import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSms {
    m_id: string;
    type: string;
    code: string;
    phone: string;
}

export class FindSms {
    @ApiProperty({
        description: '手机号',
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '手机号不能为空' })
    phone: string;

    @ApiProperty({
        description: '类型',
        enum: ['sign', 'statement', 'withdraw'],
        required: true,
        default: '',
    })
    @IsNotEmpty({ message: '类型不能为空' })
    type: string;

    @ApiProperty({
        description: '验证码',
        default: '',
        required: true,
    })
    @IsNotEmpty({ message: '验证码不能为空' })
    code?: string;
}

export class UpdateSms {
    phone: string;
    type: string;
    code: string;
}
