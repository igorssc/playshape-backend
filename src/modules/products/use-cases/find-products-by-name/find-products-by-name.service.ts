import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindProductsByNameInput } from '../../inputs/find-products-by-name.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class FindProductsByNameService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
  ) {}

  async execute({ name, page, limit }: FindProductsByNameInput) {
    const products = await this.productsRepository.findByName(
      name,
      page,
      limit,
    );

    if (!products) {
      throw new HttpException('Product does not exists', HttpStatus.NOT_FOUND);
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
