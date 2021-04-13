import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CaslAbilityFactory } from '../../../../casl/casl-ability.factory';
import { GetUserIdDecorator } from '../../../../decorators/get-user-id.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate-user.guard';
import { FindUserDTO } from '../../dtos/find-user.dto';
import { User } from '../../entities/user.schema';
import { FindUserInput } from '../../inputs/find-user.input';
import { FindUserService } from './find-user.service';

@Resolver()
class FindUserResolver {
  constructor(
    private FindUserService: FindUserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => FindUserDTO)
  @UseGuards(AuthenticateGuard)
  async findUser(
    @Args('input') input: FindUserInput,
    @GetUserIdDecorator() currentUserId: string,
  ) {
    const currentUser = await this.FindUserService.execute({
      _id: currentUserId,
    });

    const findUser = await this.FindUserService.execute(
      input.user,
      currentUserId,
    );

    const ability = this.caslAbilityFactory.checkPermission(
      currentUser as User,
      ActionsUser.FindUsers,
    );

    const findUserTyped = new User();

    Object.assign(findUserTyped, { _id: findUser._id });

    if (!ability.can(ActionsUser.FindUsers, findUserTyped)) {
      throw new HttpException(
        'You are not authorized to perform that action',
        HttpStatus.FORBIDDEN,
      );
    }

    return findUser;
  }
}

export { FindUserResolver };
