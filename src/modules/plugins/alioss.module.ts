import { AliOssModule } from 'nestjs-ali-oss';
import { accessKeyId, accessKeySecret, oss } from 'src/config/ali.config';

export default AliOssModule.register({
    accessKeyId,
    accessKeySecret,
    ...oss,
});
