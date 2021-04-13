import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { CreateUserInput } from '../../inputs/create-user.input';
import { CreateUsersService } from './create-user.service';

@Resolver()
class CreateUserResolver {
  constructor(private createUsersService: CreateUsersService) {}

  @Mutation(() => CreateUserDTO)
  async createUser(@Args('input') input: CreateUserInput) {
    const createdUser = await this.createUsersService.execute(input);
    return createdUser;
  }
}

export { CreateUserResolver };
