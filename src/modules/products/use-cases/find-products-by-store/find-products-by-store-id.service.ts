import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindProductsByStoreInput } from '../../inputs/find-products-by-store.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class FindProductsByStoreIdService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
  ) {}

  async execute({ store, page, limit }: FindProductsByStoreInput) {
    validateObjectId(store);

    const products = await this.productsRepository.findByStoreId(
      store,
      page,
      limit,
    );

    if (!products) {
      throw new HttpException('Not found products', HttpStatus.NOT_FOUND);
    }

    const productWithVariants = products.docs.map(async (product) => {
      const variants = await this.variantsRepository.findByProduct(product._id);

      return { ...product.toJSON(), variants };
    });

    delete Object.assign(products, {
      products: await Promise.all(productWithVariants),
    })['docs'];

    return products;
  }
}
