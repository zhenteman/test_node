import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBAuthService } from './index.service';
import { AuthSchema } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'auth', schema: AuthSchema }]),
    ],
    providers: [DBAuthService],
    exports: [DBAuthService],
})
export class DBAuthModule {}
