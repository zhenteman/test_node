import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBWalletService } from './index.service';
import { WalletSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'wallet', schema: WalletSchema }]),
    ],
    providers: [DBWalletService],
    exports: [DBWalletService],
})
export class DBWalletModule {}
