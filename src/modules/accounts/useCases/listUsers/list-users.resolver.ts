import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListUserDTO } from '../../dtos/list-user.dto';
import { ListUsersService } from './list-users.service';
import { CheckPolicies } from '../../../../decorators/check-policies.decorator';
import { Actions } from '../../../../enuns/actions.enum';
import { User } from '../../entities/user.schema';
import { PoliciesGuardListUsers } from '../../../../guards/casl-policy-list-users.guard';
import { AppAbility } from '../../../../casl/casl-ability.factory';

@Resolver()
class ListUsersResolver {
  constructor(private listUsersService: ListUsersService) {}

  @Query(() => [ListUserDTO])
  @UseGuards(PoliciesGuardListUsers)
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.ListUsers, User))
  async listAllUsers(@Args('token') token: string) {
    const users = await this.listUsersService.execute();
    return users;
  }
}

export { ListUsersResolver };
