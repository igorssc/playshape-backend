import { ForbiddenException, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import mongoose from 'mongoose';

import { GetUserIdDecorator } from '../../../../decorators/get-user-id.decorator';
import { Actions } from '../../../../enuns/actions.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate.guard';
import { ListUserDTO } from '../../dtos/list-user.dto';
import { User } from '../../entities/user.schema';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { UpdateUserService } from './update-user.service';
import { GetUser } from '../../common/get-user';
import { CaslAbilityFactory } from '../../../../casl/casl-ability.factory';

@Resolver()
class UpdateUserResolver {
  constructor(
    private updateUserService: UpdateUserService,
    private caslAbilityFactory: CaslAbilityFactory,
    private getUser: GetUser,
  ) {}

  @ApiForbiddenResponse({
    description: 'You are not authorized to perform that action',
  })
  @Mutation(() => ListUserDTO)
  @UseGuards(AuthenticateGuard)
  async updateUser(
    @GetUserIdDecorator() currentUserId: string,
    @Args('input') input: UpdateUserInput,
  ) {
    const { user } = input;

    let userId = currentUserId;

    if (user._id) {
      const editUser = new User();

      Object.assign(editUser, {
        _id: mongoose.Types.ObjectId(user._id),
      });

      const currentUser = await this.getUser.get(currentUserId);

      const ability = this.caslAbilityFactory.updateUser(currentUser);

      if (!ability.can(Actions.UpdateUser, editUser)) {
        throw new ForbiddenException();
      }

      userId = user._id;

      delete user._id;
    }

    return await this.updateUserService.execute(userId, user);
  }
}

export { UpdateUserResolver };
