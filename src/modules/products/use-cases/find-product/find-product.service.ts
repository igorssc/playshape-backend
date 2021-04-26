import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindProductInput } from '../../inputs/find-product.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class FindProductService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
  ) {}

  async execute(input: FindProductInput) {
    const args = Object.keys(input).length;

    if (args > 1) {
      throw new HttpException(
        'More than one search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    input._id && validateObjectId(input._id);

    const findProduct = input._id
      ? await this.productsRepository.findById(input._id)
      : input.slug
      ? await this.productsRepository.findBySlug(input.slug)
      : undefined;

    if (!findProduct) {
      throw new HttpException('Product does not exists', HttpStatus.NOT_FOUND);
    }

    const findVariants = await this.variantsRepository.findByProduct(
      findProduct._id,
    );

    Object.assign(findProduct, { variants: findVariants });

    return findProduct;
  }
}
