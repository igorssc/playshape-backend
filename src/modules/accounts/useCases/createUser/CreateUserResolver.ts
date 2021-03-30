import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../../inputs/CreateUser.input';
import { UserModel } from '../../models/user.model';
import { User } from '../../schema/user.schema';

import { CreateUsersUseCase } from './CreateUserUseCase';

@Resolver(() => User)
class CreateUserResolver {
  constructor(private createUsersUseCase: CreateUsersUseCase) {}

  @Mutation(() => UserModel)
  async createUser(@Args('user') user: CreateUserInput) {
    const createdUser = await this.createUsersUseCase.execute(user);

    return createdUser;
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }
}

export { CreateUserResolver };
