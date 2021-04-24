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

  async execute(product: FindProductInput) {
    validateObjectId(product._id);

    const findProduct = await this.productsRepository.findById(product._id);

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
