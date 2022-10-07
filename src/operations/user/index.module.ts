import { Module } from '@nestjs/common';
import { UserController } from './index.controller';
import { UserService } from './index.service';
import { DBUserModule } from '../../database/mongodb/user/index.module';

@Module({
    imports: [DBUserModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
