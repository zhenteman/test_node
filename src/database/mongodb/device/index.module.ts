import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBDeviceService } from './index.service';
import { DeviceSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'device', schema: DeviceSchema }]),
    ],
    providers: [DBDeviceService],
    exports: [DBDeviceService],
})
export class DBDeviceModule {}
