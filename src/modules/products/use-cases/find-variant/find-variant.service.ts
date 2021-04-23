import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindVariantInput } from '../../inputs/find-variant.input';
import { VariantsRepository } from '../../repositories/implementations/variants.repository';

@Injectable()
export class FindVariantService {
  constructor(private readonly variantsRepository: VariantsRepository) {}

  async execute(variant: FindVariantInput) {
    const findVariants = await this.variantsRepository.findById(variant._id);

    if (!findVariants) {
      throw new HttpException('Variant does not exists', HttpStatus.NOT_FOUND);
    }

    return findVariants;
  }
}
