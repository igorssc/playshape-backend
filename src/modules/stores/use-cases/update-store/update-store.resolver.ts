import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CaslAbilityFactory } from '../../../../casl/casl-ability.factory';
import { GetIdByToken } from '../../../../decorators/get-id-by-token.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { User } from '../../../accounts/entities/user.entity';
import { FindUserInput } from '../../../accounts/inputs/find-user.input';
import { FindUserService } from '../../../accounts/use-cases/find-user/find-user.service';
import { UpdateStoreDTO } from '../../dtos/update-store.dto';
import { UpdateStoreInput } from '../../inputs/update-store.input';
import { UpdateStoreService } from './update-store.service';

@Resolver()
export class UpdateStoreResolver {
  constructor(
    private updateStoreService: UpdateStoreService,
    private findUserService: FindUserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Mutation(() => UpdateStoreDTO)
  async updateStore(
    @Args('input') input: UpdateStoreInput,
    @GetIdByToken() currentAccountId: string,
  ) {
    if (input._id) {
      if (input._id !== currentAccountId) {
        const user = async () => {
          try {
            const user = await this.findUserService.execute({
              _id: currentAccountId,
            } as FindUserInput);

            return user;
          } catch {
            return false;
          }
        };

        const findUser = await user();

        if (findUser) {
          const ability = this.caslAbilityFactory.checkPermission(
            findUser as User,
            ActionsUser.UpdateStores,
          );

          if (!ability.can(ActionsUser.UpdateStores, findUser)) {
            throw new HttpException(
              'You are not authorized to perform that action',
              HttpStatus.FORBIDDEN,
            );
          }

          return await this.updateStoreService.execute(input._id, input);
        }
      } else {
        return await this.updateStoreService.execute(input._id, input);
      }
    } else if (currentAccountId) {
      return await this.updateStoreService.execute(currentAccountId, input);
    }

    throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
  }
}
