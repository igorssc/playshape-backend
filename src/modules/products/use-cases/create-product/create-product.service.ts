import { Injectable } from '@nestjs/common';
import { uploadFile } from '../../../../config/upload';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindCategoryInput } from '../../../categories/inputs/find-category.input';
import { FindCategoryService } from '../../../categories/use-cases/find-category/find-category.resolver';
import { FindStoreInput } from '../../../stores/inputs/find-store.input';
import { FindStoreService } from '../../../stores/use-cases/find-store/find-store.service';
import { CreateProductInput } from '../../inputs/create-product.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
    private readonly findStoreService: FindStoreService,
    private readonly findCategoryService: FindCategoryService,
  ) {}

  async execute(product: CreateProductInput) {
    validateObjectId(product.store, 'Incorrect store id entered');

    await this.findStoreService.execute({
      _id: product.store,
    } as FindStoreInput);

    await Promise.all(
      product.category.map(async (_id) => {
        validateObjectId(_id, 'Incorrect category id entered');

        await this.findCategoryService.execute({
          _id,
        } as FindCategoryInput);
      }),
    );

    const variants = product.variants;
    delete product.variants;

    const createProduct = await this.productsRepository.create(product);

    const createVariants = variants.map(async (variant) => {
      const picture = await variant.picture;

      const path = await uploadFile(picture, 'image', 'products_pictures');

      Object.assign(variant, { product: createProduct._id, picture: path });

      return await this.variantsRepository.create(variant);
    });

    const findProduct = await this.productsRepository.findById(
      String(createProduct._id),
    );

    Object.assign(findProduct, { variants: createVariants });

    return { product: findProduct };
  }
}
