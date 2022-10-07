import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBBarcodeService } from './index.service';
import { BarcodeSchema, SchemaName } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SchemaName, schema: BarcodeSchema },
        ]),
    ],
    providers: [DBBarcodeService],
    exports: [DBBarcodeService],
})
export class DBBarcodeModule {}
