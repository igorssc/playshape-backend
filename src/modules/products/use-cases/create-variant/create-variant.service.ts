import { Injectable } from '@nestjs/common';
import { uploadFile } from '../../../../config/upload';
import { CreateVariantInput } from '../../inputs/create-variant.input';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class CreateVariantService {
  constructor(private readonly variantsRepository: VariantsRepository) {}

  async execute(variant: CreateVariantInput) {
    const picture = await variant.picture;

    const path = await uploadFile(picture, 'image', 'products_pictures');

    Object.assign(variant, { picture: path });

    return await this.variantsRepository.create(variant);
  }
}
