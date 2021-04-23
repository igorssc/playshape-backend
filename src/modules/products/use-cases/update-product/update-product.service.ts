import { Injectable } from '@nestjs/common';
import { uploadFile } from '../../../../config/upload';
import { deleteFile } from '../../../../storage/delete';
import { UpdateProductInput } from '../../inputs/update-product.input';
import { ProductsRepository } from '../../repositories/implementations/products.repository';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';
import { FindProductService } from '../find-product/find-product.service';

@Injectable()
export class UpdateProductService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly variantsRepository: VariantsRepository,
    private findProductService: FindProductService,
  ) {}

  async execute(product: UpdateProductInput) {
    let productId: string;

    if (product.variants) {
      await Promise.all(
        product.variants.map(async (variant) => {
          if (variant.picture) {
            const currentVariant = await this.variantsRepository.findById(
              variant._id,
            );

            const picture = await variant.picture;

            const path = await uploadFile(
              picture,
              'image',
              'products_pictures',
            );

            if (currentVariant['picture']) {
              await deleteFile(currentVariant.picture.filename);
            }

            Object.assign(variant, { picture: path });
          }

          Object.assign(variant, { updated_at: new Date() });

          const updateVariant = await this.variantsRepository.update(
            variant._id,
            variant,
          );

          productId = String(updateVariant.product);

          return updateVariant;
        }),
      );
    }

    if (product._id) {
      delete product.variants;

      Object.assign(product, { updated_at: new Date() });

      await this.productsRepository.update(product._id, product);
    }

    const findProduct = await this.findProductService.execute({
      _id: product._id ?? productId,
    });

    return findProduct;
  }
}
