import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListUserDTO } from '../../dtos/ListUserDTO';
import { EnsureAuthenticated } from '../../../../middlewares/ensureAuthenticated';
import { ListUsersUseCase } from './ListUsersUseCase';

@Resolver()
class ListUsersResolver {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  @Query(() => [ListUserDTO])
  @UseGuards(EnsureAuthenticated)
  async listAllUsers(@Args('token') token: string) {
    const users = await this.listUsersUseCase.execute();

    return users;
  }
}

export { ListUsersResolver };
