import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBUserService } from './index.service';
import { UserSchema, SchemaName } from './index.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SchemaName, schema: UserSchema }]),
    ],
    providers: [DBUserService],
    exports: [DBUserService],
})
export class DBUserModule {}
