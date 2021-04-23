import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { CaslAbilityFactory } from '../../../../casl/implementations/casl-ability.factory';
import { GetIdByToken } from '../../../../decorators/get-id-by-token.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate-user.guard';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { UpdateUserDTO } from '../../dtos/update-user.dto';
import { User } from '../../entities/user.entity';
import { FindUserInput } from '../../inputs/find-user.input';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { FindUserService } from '../find-user/find-user.service';
import { UpdateUserService } from './update-user.service';

@Resolver()
export class UpdateUserResolver {
  constructor(
    private updateUserService: UpdateUserService,
    private caslAbilityFactory: CaslAbilityFactory,
    private findUserService: FindUserService,
  ) {}

  @Mutation(() => UpdateUserDTO)
  @UseGuards(AuthenticateGuard)
  async updateUser(
    @GetIdByToken() currentUserId: string,
    @Args('input') input: UpdateUserInput,
  ) {
    let userId = currentUserId;

    if (input._id) {
      validateObjectId(input._id);

      const editUser = Object.assign(new User(), {
        _id: mongoose.Types.ObjectId(input._id),
      });

      const currentUser = await this.findUserService.execute({
        _id: currentUserId,
      } as FindUserInput);

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

      userId = input._id;
    }

    return await this.updateUserService.execute(userId, input);
  }
}
