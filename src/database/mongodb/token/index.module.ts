import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBTokenService } from './index.service';
import { TokenSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'token', schema: TokenSchema }]),
    ],
    providers: [DBTokenService],
    exports: [DBTokenService],
})
export class DBTokenModule {}
