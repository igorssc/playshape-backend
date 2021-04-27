import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { FindCategoryInput } from '../../../categories/inputs/find-category.input';
import { FindCategoryService } from '../../../categories/use-cases/find-category/find-category.service';
import { ProductDocument } from '../../entities/product.entity';
import { FindProductsInput } from '../../inputs/find-products.input';
import { SearchProductsInput } from '../../inputs/search-products.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';
import { FindProductsService } from '../find-products/find-products.service';

@Injectable()
export class SearchProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
    private readonly findCategoryService: FindCategoryService,
    private readonly findProductsService: FindProductsService,
  ) {}

  async execute({ value, page, limit }: SearchProductsInput) {
    let findProducts: PaginateResult<ProductDocument>;

    try {
      const findCategory = await this.findCategoryService.execute({
        name: value,
      } as FindCategoryInput);

      if (findCategory) {
        findProducts = await this.findProductsService.execute({
          page,
          limit,
          product: { category: { _id: String(findCategory._id) } },
        } as FindProductsInput);

        return findProducts;
      }
    } catch {}

    try {
      findProducts = await this.findProductsService.execute({
        page,
        limit,
        product: { name: value },
      } as FindProductsInput);

      return findProducts;
    } catch {}
  }
}
