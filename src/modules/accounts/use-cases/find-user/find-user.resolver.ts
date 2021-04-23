import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CaslAbilityFactory } from '../../../../casl/implementations/casl-ability.factory';
import { GetIdByToken } from '../../../../decorators/get-id-by-token.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate-user.guard';
import { FindUserDTO } from '../../dtos/find-user.dto';
import { User } from '../../entities/user.entity';
import { FindUserInput } from '../../inputs/find-user.input';
import { FindUserService } from './find-user.service';

@Resolver()
export class FindUserResolver {
  constructor(
    private FindUserService: FindUserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => FindUserDTO)
  @UseGuards(AuthenticateGuard)
  async findUser(
    @GetIdByToken() currentUserId: string,
    @Args('input', { nullable: true }) input: FindUserInput,
  ) {
    const currentUser = await this.FindUserService.execute({
      _id: currentUserId,
    } as FindUserInput);

    const searchWantedUser = await this.FindUserService.execute(
      input ?? ({} as FindUserInput),
      currentUserId,
    );

    const wantedUser = Object.assign(new User(), { _id: searchWantedUser._id });

    const ability = this.caslAbilityFactory.checkPermission(
      currentUser as User,
      ActionsUser.FindUsers,
    );

    if (!ability.can(ActionsUser.FindUsers, wantedUser)) {
      throw new HttpException(
        'You are not authorized to perform that action',
        HttpStatus.FORBIDDEN,
      );
    }

    return searchWantedUser;
  }
}
