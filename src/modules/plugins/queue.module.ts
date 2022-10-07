import { BullModule } from '@nestjs/bull';

export default BullModule.forRoot({
    redis: {
        host: 'localhost',
        port: 6379,
    },
});
