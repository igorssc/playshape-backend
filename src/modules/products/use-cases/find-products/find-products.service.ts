import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindCategoryInput } from '../../../categories/inputs/find-category.input';
import { FindCategoryService } from '../../../categories/use-cases/find-category/find-category.resolver';
import { FindStoreInput } from '../../../stores/inputs/find-store.input';
import { FindStoreService } from '../../../stores/use-cases/find-store/find-store.service';
import { FindProductsInput } from '../../inputs/find-products.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class FindProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly findStoreService: FindStoreService,
    private readonly findCategoryService: FindCategoryService,
    private readonly variantsRepository: VariantsRepository,
  ) {}

  async execute(input: FindProductsInput) {
    const args = Object.keys(input).filter(
      (arg) => arg !== 'page' && arg !== 'limit',
    ).length;

    if (args > 1) {
      throw new HttpException(
        'More than one search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    input.product?.store?._id && validateObjectId(input.product.store._id);
    input.product?.category?._id &&
      validateObjectId(input.product.category._id);

    const getStoreBySlug = async (slug: string) =>
      await this.findStoreService.execute({
        slug,
      } as FindStoreInput);

    const getCategoryBySlug = async (slug: string) =>
      await this.findCategoryService.execute({
        slug,
      } as FindCategoryInput);

    input.product?.store?.slug
      ? Object.assign(input.product.store, {
          _id: String((await getStoreBySlug(input.product.store.slug))._id),
        })
      : input.product?.category?.slug &&
        Object.assign(input.product.category, {
          _id: String(
            (await getCategoryBySlug(input.product.category.slug))._id,
          ),
        });

    const findProducts = input.product.name
      ? await this.productsRepository.findByName(
          input.product.name,
          input.page,
          input.limit,
        )
      : input.product?.store?._id
      ? await this.productsRepository.findByStoreId(
          input.product.store._id,
          input.page,
          input.limit,
        )
      : input.product?.category?._id
      ? await this.productsRepository.findByCategoryId(
          input.product.category._id,
          input.page,
          input.limit,
        )
      : undefined;

    if (!findProducts) {
      throw new HttpException('Not found products', HttpStatus.NOT_FOUND);
    }

    const productWithVariants = findProducts.docs.map(async (product) => {
      const variants = await this.variantsRepository.findByProduct(product._id);

      return { ...product.toJSON(), variants };
    });

    delete Object.assign(findProducts, {
      products: await Promise.all(productWithVariants),
    })['docs'];

    return findProducts;
  }
}
