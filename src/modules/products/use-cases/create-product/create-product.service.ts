import { Injectable } from '@nestjs/common';
import { CreateProductInput } from '../../inputs/create-product.input';
import { ProductsRepository } from '../../repositories/implementatios/product.repository';

@Injectable()
export class CreateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(product: CreateProductInput) {
    const createProduct = await this.productsRepository.create(product);

    return createProduct;
  }
}
