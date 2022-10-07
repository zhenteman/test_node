import { DBClassifyModule } from './../../database/mongodb/classify/index.module';
import { Module } from '@nestjs/common';
import { ClassifyController } from './index.controller';
import { ClassifyService } from './index.service';

@Module({
    imports: [DBClassifyModule],
    controllers: [ClassifyController],
    providers: [ClassifyService],
})
export class ClassifyModule {}
