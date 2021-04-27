import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindProductsRelatedInput } from '../../inputs/find-products-related.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';
import { FindProductService } from '../find-product/find-product.service';

@Injectable()
export class FindProductsRelatedService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
    private readonly findProductService: FindProductService,
  ) {}

  async execute(input: FindProductsRelatedInput) {
    const findProduct = await this.findProductService.execute({
      _id: input._id,
    });

    if (!findProduct) {
      throw new HttpException('Product does not exists', HttpStatus.NOT_FOUND);
    }

    const productsRelated = await this.productsRepository.findByRelated(
      input._id,
      {
        categories: (findProduct.category as any).map((category: any) =>
          String(category._id),
        ),
        store: String((findProduct.store as any)._id),
      },
      input.page,
      input.limit,
    );

    if (!productsRelated) {
      throw new HttpException('Not found products', HttpStatus.NOT_FOUND);
    }

    const productWithVariants = productsRelated.docs.map(async (product) => {
      const variants = await this.variantsRepository.findByProduct(product._id);

      return { ...product.toJSON(), variants };
    });

    delete Object.assign(productsRelated, {
      products: await Promise.all(productWithVariants),
    })['docs'];

    return productsRelated;
  }
}
