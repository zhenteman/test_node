import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBClassifyService } from './index.service';
import { ClassifySchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'classify', schema: ClassifySchema },
        ]),
    ],
    providers: [DBClassifyService],
    exports: [DBClassifyService],
})
export class DBClassifyModule {}
