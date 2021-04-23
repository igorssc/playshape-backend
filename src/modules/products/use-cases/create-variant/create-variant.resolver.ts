import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetIdByToken } from '../../../../decorators/get-id-by-token.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindUserInput } from '../../../accounts/inputs/find-user.input';
import { FindUserService } from '../../../accounts/use-cases/find-user/find-user.service';
import { FindStoreInput } from '../../../stores/inputs/find-store.input';
import { FindStoreService } from '../../../stores/use-cases/find-store/find-store.service';
import CreateVariantDTO from '../../dtos/create-variant.dto';
import { ProductDTO } from '../../dtos/product.dto';
import { CreateVariantInput } from '../../inputs/create-variant.input';
import { FindProductService } from '../find-product/find-product.service';
import { CreateVariantService } from './create-variant.service';

@Resolver()
export class CreateVariantResolver {
  constructor(
    private createVariantService: CreateVariantService,
    private findStoreService: FindStoreService,
    private findUserService: FindUserService,
    private findProductService: FindProductService,
  ) {}

  @Mutation(() => CreateVariantDTO)
  async createVariant(
    @Args('input') input: CreateVariantInput,
    @GetIdByToken() currentAccountId: string,
  ) {
    validateObjectId(input.product);

    const product = await this.findProductService.execute({
      _id: input.product,
    });

    try {
      const currentAccountIsForAStore = await this.findStoreService.execute({
        _id: currentAccountId,
      } as FindStoreInput);

      if (
        String(currentAccountIsForAStore._id) !==
        String(((product.store as unknown) as ProductDTO)._id)
      ) {
        throw new HttpException(
          'You are not authorized to perform that action',
          HttpStatus.FORBIDDEN,
        );
      }

      return await this.createVariantService.execute(input);
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        throw new HttpException(error.message, error.status);
      }
    }

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

      return await this.createVariantService.execute(input);
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        throw new HttpException(error.message, error.status);
      }
    }

    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }
}
