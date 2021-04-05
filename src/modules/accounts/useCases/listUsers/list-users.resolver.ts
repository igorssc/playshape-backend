import { ApiForbiddenResponse } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListUsersService } from './list-users.service';
import { CheckPolicies } from '../../../../decorators/check-policies.decorator';
import { Actions } from '../../../../enuns/actions.enum';
import { User } from '../../entities/user.schema';
import { PoliciesGuardListUsers } from '../../../../guards/casl-policy-list-users.guard';
import { AppAbility } from '../../../../casl/casl-ability.factory';
import { ListUsersInput } from '../../inputs/list-users.input';
import { ListUsersDTO } from '../../dtos/list-users.dto';
@Resolver()
class ListUsersResolver {
  constructor(private listUsersService: ListUsersService) {}

  @ApiForbiddenResponse({
    description: 'You are not authorized to perform that action',
  })
  @Query(() => ListUsersDTO)
  @UseGuards(PoliciesGuardListUsers)
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.ListUsers, User))
  async listAllUsers(@Args('input') input: ListUsersInput) {
    const users = await this.listUsersService.execute(input);

    return users;
  }
}

export { ListUsersResolver };
