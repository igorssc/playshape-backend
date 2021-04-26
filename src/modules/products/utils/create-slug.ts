import { Injectable } from '@nestjs/common';
import { createSlug } from '../../../utils/create-slug';
import { FindProductInput } from '../inputs/find-product.input';
import { FindProductService } from '../use-cases/find-product/find-product.service';

@Injectable()
export class CreateProductSlug {
  constructor(private findProductService: FindProductService) {}

  async create(name: string) {
    const initialSlug = createSlug(name);

    let slug: string;
    let incrementSlug: number = 0;

    while (!slug) {
      try {
        await this.findProductService.execute({
          slug: initialSlug + (incrementSlug === 0 ? '' : '-' + incrementSlug),
        } as FindProductInput);

        ++incrementSlug;
      } catch {
        slug = initialSlug + (incrementSlug === 0 ? '' : '-' + incrementSlug);
      }
    }

    return slug;
  }
}
