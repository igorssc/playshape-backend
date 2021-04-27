import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetIdByToken } from '../../../../decorators/get-id-by-token.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindUserInput } from '../../../accounts/inputs/find-user.input';
import { FindUserService } from '../../../accounts/use-cases/find-user/find-user.service';
import { ProductDTO } from '../../dtos/product.dto';
import { UpdateProductDTO } from '../../dtos/update-product.dto';
import { FindProductInput } from '../../inputs/find-product.input';
import { UpdateProductInput } from '../../inputs/update-product.input';
import { FindProductService } from '../find-product/find-product.service';
import { FindVariantService } from '../find-variant/find-variant.service';
import { UpdateProductService } from './update-product.service';

@Resolver()
export class UpdateProductResolver {
  constructor(
    private updateProductService: UpdateProductService,
    private findUserService: FindUserService,
    private findProductService: FindProductService,
    private findVariantService: FindVariantService,
  ) {}

  @Mutation(() => UpdateProductDTO)
  async updateProduct(
    @Args('input') input: UpdateProductInput,
    @GetIdByToken() currentAccountId: string,
  ) {
    let productId: string;
    let storeId: string;

    if (input?.variants?.length > 0) {
      const variantArray = input.variants.map(async (variant) => {
        return await this.findVariantService.execute({ _id: variant._id });
      });

      const variantIdArray = (await Promise.all(variantArray)).map(
        (variant) => {
          return String(variant.product);
        },
      );

      const variantIdArrayDistinct = [...new Set(variantIdArray)];

      if (!variantIdArrayDistinct || variantIdArrayDistinct.length > 1) {
        throw new HttpException(
          'It is not possible to update variants of other products',
          HttpStatus.BAD_REQUEST,
        );
      }

      productId = variantIdArrayDistinct[0];
    }

    if (input._id) {
      validateObjectId(input._id);

      const findProduct = await this.findProductService.execute({
        _id: input._id,
      } as FindProductInput);

      if (productId && productId !== String(findProduct._id)) {
        throw new HttpException(
          'It is not possible to update variants of other products',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        productId = String(findProduct._id);
        storeId = String(((findProduct.store as unknown) as ProductDTO)._id);
      }
    } else {
      if (!productId) {
        throw new HttpException(
          'Insufficient arguments',
          HttpStatus.BAD_REQUEST,
        );
      }

      const findProduct = await this.findProductService.execute({
        _id: productId,
      } as FindProductInput);

      storeId = String(((findProduct.store as unknown) as ProductDTO)._id);
    }

    if (storeId !== currentAccountId) {
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
        const userAthorization = findUser.permissions.some(
          (permission) => permission == ActionsUser.CreateProduct,
        );

        if (!userAthorization) {
          throw new HttpException(
            'You are not authorized to perform that action',
            HttpStatus.FORBIDDEN,
          );
        }

        return await this.updateProductService.execute(input);
      } else {
        throw new HttpException(
          'You are not authorized to perform that action',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      return await this.updateProductService.execute(input);
    }
  }
}
