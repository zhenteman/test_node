import { Module } from '@nestjs/common';
import Modules from './index.module';
import providers from '../providers/index.providers';

@Module({
    imports: Modules,
    providers,
})
export class AppModule {}
