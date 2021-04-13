import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { CaslAbilityFactory } from '../../../../casl/casl-ability.factory';
import { GetUserIdDecorator } from '../../../../decorators/get-user-id.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate-user.guard';
import { UpdateUserDTO } from '../../dtos/update-user.dto';
import { User } from '../../entities/user.schema';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { FindUserService } from '../findUser/find-user.service';
import { UpdateUserService } from './update-user.service';

@Resolver()
class UpdateUserResolver {
  constructor(
    private updateUserService: UpdateUserService,
    private caslAbilityFactory: CaslAbilityFactory,
    private findUserService: FindUserService,
  ) {}

  @Mutation(() => UpdateUserDTO)
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

      const currentUser = await this.findUserService.execute({
        _id: currentUserId,
      });

      const ability = this.caslAbilityFactory.checkPermission(
        currentUser as User,
        ActionsUser.UpdateUsers,
      );

      if (!ability.can(ActionsUser.UpdateUsers, editUser)) {
        throw new HttpException(
          'You are not authorized to perform that action',
          HttpStatus.FORBIDDEN,
        );
      }

      userId = user._id;
    }

    return await this.updateUserService.execute(userId, user);
  }
}

export { UpdateUserResolver };
