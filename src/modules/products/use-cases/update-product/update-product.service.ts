import { Injectable } from '@nestjs/common';
import { UpdateProductInput } from '../../inputs/update-product.input';
import { ProductsRepository } from '../../repositories/implementatios/product.repository';

@Injectable()
export class UpdateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(product: UpdateProductInput) {}
}
