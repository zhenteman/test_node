import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBReputationService } from './index.service';
import { ReputationSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'reputation', schema: ReputationSchema },
        ]),
    ],
    providers: [DBReputationService],
    exports: [DBReputationService],
})
export class DBReputationModule {}
