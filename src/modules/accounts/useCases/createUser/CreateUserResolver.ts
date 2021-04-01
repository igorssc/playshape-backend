import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ListUserDTO } from '../../dtos/ListUserDTO';
import { CreateUserInput } from '../../inputs/CreateUser.input';
import { CreateUsersUseCase } from './CreateUserUseCase';

@Resolver()
class CreateUserResolver {
  constructor(private createUsersUseCase: CreateUsersUseCase) {}

  @Mutation(() => ListUserDTO)
  async createUser(@Args('user') user: CreateUserInput) {
    const createdUser = await this.createUsersUseCase.execute(user);

    return createdUser;
  }
}

export { CreateUserResolver };
