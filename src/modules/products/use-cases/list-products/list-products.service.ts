import { Injectable } from '@nestjs/common';
import { ListProductsInput } from '../../inputs/list-products.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class ListProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
  ) {}

  async execute({ page, limit }: ListProductsInput) {
    const products = await this.productsRepository.listAll(page, limit);

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
