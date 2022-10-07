import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Recipe } from './index.model';
import { PubSub } from 'apollo-server-express';

const pubSub = new PubSub();

@Resolver(() => Recipe)
export class UserResolver {
    @Query(() => String)
    async author(@Args('id') id: number) {
        return '123';
    }

    @Subscription((returns) => Recipe)
    recipeAdded() {
        return pubSub.asyncIterator('recipeAdded');
    }
}
