import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindProductsInput } from '../../inputs/find-products.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class FindProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
  ) {}

  async execute(input: FindProductsInput) {
    const args = Object.keys(input).filter(
      (arg) => arg !== 'page' && arg !== 'limit',
    ).length;

    if (args > 1) {
      throw new HttpException(
        'More than one search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    input.product.store && validateObjectId(input.product.store);

    const findProducts = input.product.name
      ? await this.productsRepository.findByName(
          input.product.name,
          input.page,
          input.limit,
        )
      : input.product.store
      ? await this.productsRepository.findByStoreId(
          input.product.store,
          input.page,
          input.limit,
        )
      : input.product.category
      ? await this.productsRepository.findByCategoryId(
          input.product.category,
          input.page,
          input.limit,
        )
      : undefined;

    if (!findProducts) {
      throw new HttpException('Not found products', HttpStatus.NOT_FOUND);
    }

    const productWithVariants = findProducts.docs.map(async (product) => {
      const variants = await this.variantsRepository.findByProduct(product._id);

      return { ...product.toJSON(), variants };
    });

    delete Object.assign(findProducts, {
      products: await Promise.all(productWithVariants),
    })['docs'];

    return findProducts;
  }
}
