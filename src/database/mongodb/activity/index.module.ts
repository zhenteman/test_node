import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBActivityService } from './index.service';
import { ActivitySchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'activity', schema: ActivitySchema },
        ]),
    ],
    providers: [DBActivityService],
    exports: [DBActivityService],
})
export class DBActivityModule {}
