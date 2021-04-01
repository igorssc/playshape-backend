import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListUserAuthenticatedDTO } from '../../dtos/ListUserAuthenticatedDTO';
import { LoginUserInput } from '../../inputs/LoginUser.input';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

@Resolver()
class AuthenticateUserResolver {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Query(() => ListUserAuthenticatedDTO)
  async authenticateUser(@Args('user') user: LoginUserInput) {
    const userAuthenticated = await this.authenticateUserUseCase.execute(user);

    return userAuthenticated;
  }
}

export { AuthenticateUserResolver };
