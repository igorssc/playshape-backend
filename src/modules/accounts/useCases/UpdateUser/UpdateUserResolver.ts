import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GetUserIdDecorator } from '../../../../decorators/GetUserIdDecorator';
import { ListUserDTO } from '../../dtos/ListUserDTO';
import { EnsureAuthenticated } from '../../../../middlewares/ensureAuthenticated';
import { UpdateUserInput } from '../../inputs/UpdateUserInput';
import { UpdateUserUseCase } from './UpdateUserUseCase';

@Resolver()
class UpdateUserResolver {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @Mutation(() => ListUserDTO)
  @UseGuards(EnsureAuthenticated)
  async updateUser(
    @GetUserIdDecorator() userId: string,
    @Args('token') token: string,
    @Args('user') user: UpdateUserInput,
  ) {
    const users = await this.updateUserUseCase.execute(userId, user);

    return users;
  }
}

export { UpdateUserResolver };
