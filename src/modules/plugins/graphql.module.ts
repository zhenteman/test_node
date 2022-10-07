import { GraphQLModule } from '@nestjs/graphql';

export default GraphQLModule.forRoot({
    installSubscriptionHandlers: true,
    autoSchemaFile: true,
});
