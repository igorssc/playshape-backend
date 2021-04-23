import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetIdByToken } from '../../../../decorators/get-id-by-token.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { FindUserInput } from '../../../accounts/inputs/find-user.input';
import { FindUserService } from '../../../accounts/use-cases/find-user/find-user.service';
import { FindStoreInput } from '../../../stores/inputs/find-store.input';
import { FindStoreService } from '../../../stores/use-cases/find-store/find-store.service';
import CreateProductDTO from '../../dtos/create-product.dto';
import { CreateProductInput } from '../../inputs/create-product.input';
import { CreateProductService } from './create-product.service';

@Resolver()
export class CreateProductResolver {
  constructor(
    private createProductService: CreateProductService,
    private findStoreService: FindStoreService,
    private findUserService: FindUserService,
  ) {}

  @Mutation(() => CreateProductDTO)
  async createProduct(
    @Args('input') input: CreateProductInput,
    @GetIdByToken() currentAccountId: string,
  ) {
    try {
      await this.findStoreService.execute({
        _id: currentAccountId,
      } as FindStoreInput);

      if (input.store) {
        delete input.store;
      }

      input.store = currentAccountId;

      return await this.createProductService.execute(input);
    } catch {}

    try {
      const findUser = await this.findUserService.execute({
        _id: currentAccountId,
      } as FindUserInput);

      const userAthorization = findUser.permissions.some(
        (permission) => permission == ActionsUser.CreateProduct,
      );

      if (!userAthorization) {
        throw new HttpException(
          'You are not authorized to perform that action',
          HttpStatus.FORBIDDEN,
        );
      }

      return await this.createProductService.execute(input);
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        throw new HttpException(error.message, error.status);
      }
    }

    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }
}
