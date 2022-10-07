import { UserModule } from './user/index.module';
import { WechatModule } from './wechat/index.module';
import { AliModule } from './ali/index.module';
import { SignModule } from './sign/index.module';
import { MerchantRegistryModule } from './merchant_registry/index.module';
import { ClassifyModule } from './classify/index.module';
import { CommodityModule } from './commodity/index.module';
import { MerchantModule } from './merchant/index.module';
import { OrderModule } from './order/index.module';
import { BarcodeModule } from './barcode/index.module';

export default [
    UserModule,
    WechatModule,
    AliModule,
    SignModule,
    MerchantRegistryModule,
    ClassifyModule,
    CommodityModule,
    MerchantModule,
    OrderModule,
    BarcodeModule,
];
