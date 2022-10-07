import { DBMerchantService } from './database/mongodb/merchant/index.service';
import { DBMerchantTokenService } from './database/mongodb/merchant_token/index.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { text } from 'body-parser';
import { join } from 'path';
import { renderFile } from 'ejs';

// 引入全局守卫
import AppGlobalGuard from './guards/app.global';
// 引入全局http异常
import HttpExceptionFilter from './filter/http.exception';
// 引入全局拦截器
import GlobalLogsInterceptor from './interceptor/global.logs.interceptor';

// 引入apm
import './service/apm';
// 引入node异常监听
import Listen from './process/exception';
// 引入swagger服务
import { SwaggerSetup } from './service/swagger';
// 引入开启服务日志
import { ServerStartConsole } from './utils/server.start.log';
import { DBTokenService } from './database/mongodb/token/index.service';
import { DBUserService } from './database/mongodb/user/index.service';

const AppServer = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'public'));

    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.engine('html', renderFile);
    app.set('view engine', 'html');

    // 允许跨域
    app.enableCors();
    // 代码压缩
    app.use(compression());

    // 接收xml格式
    app.use(text({ type: 'application/xml' }));
    app.use(text({ type: 'text/xml' }));

    // 全局管道验证
    app.useGlobalPipes(new ValidationPipe());

    // 全局守卫
    const dbTokenService = app.get<DBTokenService>(DBTokenService);
    const dbUserService = app.get<DBUserService>(DBUserService);

    // 商家端
    const dbMerchantTokenService = app.get<DBMerchantTokenService>(
        DBMerchantTokenService,
    );
    const dbMerchantService = app.get<DBMerchantService>(DBMerchantService);
    app.useGlobalGuards(
        new AppGlobalGuard(
            dbTokenService,
            dbUserService,
            dbMerchantTokenService,
            dbMerchantService,
        ),
    );

    // 全局异常
    app.useGlobalFilters(new HttpExceptionFilter());
    // 全局拦截器
    app.useGlobalInterceptors(new GlobalLogsInterceptor());

    // 开启swagger服务
    const swaggerPath = SwaggerSetup(app);

    const port = 4000;
    await app.listen(port);

    // 开启服务log
    ServerStartConsole(port, swaggerPath);
};

// domain run context
Listen.run(AppServer);
