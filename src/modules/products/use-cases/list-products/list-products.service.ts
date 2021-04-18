import { Injectable } from '@nestjs/common';
import { ListProductsInput } from '../../inputs/list-products.input';
import { ProductsRepository } from '../../repositories/implementatios/product.repository';

@Injectable()
export class ListProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({ page, limit }: ListProductsInput) {
    const products = await this.productsRepository.listAll(page, limit);

    delete Object.assign(products, { products: products.docs })['docs'];

    return products;
  }
}
