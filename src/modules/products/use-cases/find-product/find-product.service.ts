import { Injectable } from '@nestjs/common';
import { FindProductInput } from '../../inputs/find-product.input';
import { ProductsRepository } from '../../repositories/implementatios/product.repository';

@Injectable()
export class FindProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(product: FindProductInput) {}
}
