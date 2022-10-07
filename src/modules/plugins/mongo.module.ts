import { MongooseModule } from '@nestjs/mongoose';
import { mongoOptions, uri } from 'src/config/mongo.config';

export default MongooseModule.forRoot(uri, mongoOptions);
