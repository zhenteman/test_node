import RedisModule from './redis.module';
import MongoModule from './mongo.module';
import GraphqlModule from './graphql.module';
import MulterModule from './multer.module';
import { DBTokenModule } from 'src/database/mongodb/token/index.module';
import { DBUserModule } from 'src/database/mongodb/user/index.module';
import { DBMerchantTokenModule } from 'src/database/mongodb/merchant_token/index.module';
import { DBMerchantModule } from 'src/database/mongodb/merchant/index.module';
import QueueModule from './queue.module';

export default [
    MongoModule,
    RedisModule,
    GraphqlModule,
    MulterModule,
    QueueModule,
    DBTokenModule,
    DBUserModule,
    DBMerchantTokenModule,
    DBMerchantModule,
];
