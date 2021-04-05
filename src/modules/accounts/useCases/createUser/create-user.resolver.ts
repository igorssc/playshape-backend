import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ListUserDTO } from '../../dtos/list-user.dto';
import { CreateUserInput } from '../../inputs/create-user.input';
import { CreateUsersService } from './create-user.service';

@Resolver()
class CreateUserResolver {
  constructor(private createUsersService: CreateUsersService) {}

  @Mutation(() => ListUserDTO)
  async createUser(@Args('input') input: CreateUserInput) {
    const createdUser = await this.createUsersService.execute(input);
    return createdUser;
  }
}

export { CreateUserResolver };
