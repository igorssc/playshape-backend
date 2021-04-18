import { Injectable } from '@nestjs/common';
import { FindProductsByNameInput } from '../../inputs/find-products-by-name.input';
import { ProductsRepository } from '../../repositories/implementatios/product.repository';

@Injectable()
export class FindProductsByNameService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(product: FindProductsByNameInput) {}
}
