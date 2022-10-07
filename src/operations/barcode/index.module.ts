import { DBBarcodeModule } from './../../database/mongodb/barcode/index.module';
import { Module } from '@nestjs/common';
import { BarcodeController } from './index.controller';
import { BarcodeService } from './index.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [DBBarcodeModule, HttpModule],
    controllers: [BarcodeController],
    providers: [BarcodeService],
})
export class BarcodeModule {}
