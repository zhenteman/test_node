import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerSetup = (app): string => {
    const path = '/unify/swagger';
    const config = new DocumentBuilder()
        .setTitle('Unify Swagger')
        .setVersion('2.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, document);

    return path;
};
