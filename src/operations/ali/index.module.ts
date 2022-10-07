import { Module } from '@nestjs/common';
import { AliController } from './index.controller';
import { AliService } from './index.service';
import AliOssModule from '../../modules/plugins/alioss.module';

@Module({
    imports: [AliOssModule],
    controllers: [AliController],
    providers: [AliService],
})
export class AliModule {}
