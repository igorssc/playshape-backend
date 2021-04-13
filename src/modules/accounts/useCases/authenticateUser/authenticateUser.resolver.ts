import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindUserAuthenticatedDTO } from '../../dtos/find-user-authenticated.dto';
import { AuthenticateUserInput } from '../../inputs/authenticate-user.input';
import { AuthenticateUserService } from './authenticateUser.service';

@Resolver()
class AuthenticateUserResolver {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Query(() => FindUserAuthenticatedDTO)
  async authenticateUser(@Args('input') input: AuthenticateUserInput) {
    const userAuthenticated = await this.authenticateUserService.execute(input);

    return userAuthenticated;
  }
}

export { AuthenticateUserResolver };
