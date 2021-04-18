import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../../../../decorators/roles.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate-user.guard';
import { ListUsersDTO } from '../../dtos/list-users.dto';
import { ListUsersInput } from '../../inputs/list-users.input';
import { ListUsersService } from './list-users.service';

@Resolver()
export class ListUsersResolver {
  constructor(private listUsersService: ListUsersService) {}

  @Query(() => ListUsersDTO)
  @Role(ActionsUser.ListUsers)
  @UseGuards(AuthenticateGuard)
  async listAllUsers(@Args('input', { nullable: true }) input: ListUsersInput) {
    const users = await this.listUsersService.execute(
      input ?? { page: 1, limit: 15 },
    );

    return users;
  }
}
