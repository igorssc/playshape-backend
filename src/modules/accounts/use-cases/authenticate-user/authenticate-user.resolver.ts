import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserAuthenticatedDTO } from '../../dtos/user-authenticated.dto';
import { AuthenticateUserInput } from '../../inputs/authenticate-user.input';
import { AuthenticateUserService } from './authenticate-user.service';

@Resolver()
export class AuthenticateUserResolver {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Query(() => UserAuthenticatedDTO)
  async authenticateUser(@Args('input') input: AuthenticateUserInput) {
    const userAuthenticated = await this.authenticateUserService.execute(input);

    return userAuthenticated;
  }
}
