import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBMerchantService } from './index.service';
import { MerchantSchema, SchemaName } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SchemaName, schema: MerchantSchema },
        ]),
    ],
    providers: [DBMerchantService],
    exports: [DBMerchantService],
})
export class DBMerchantModule {}
