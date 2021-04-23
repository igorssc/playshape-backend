import { Injectable } from '@nestjs/common';
import { createSlug } from '../../../utils/create-slug';
import { FindStoreInput } from '../inputs/find-store.input';
import { FindStoreService } from '../use-cases/find-store/find-store.service';

@Injectable()
export class CreateSlug {
  constructor(private findStoreService: FindStoreService) {}

  async create(name: string) {
    const initialSlug = createSlug(name);

    let slug: string;
    let incrementSlug: number = 0;

    while (!slug) {
      try {
        await this.findStoreService.execute({
          slug: initialSlug + (incrementSlug === 0 ? '' : '-' + incrementSlug),
        } as FindStoreInput);

        ++incrementSlug;
      } catch {
        slug = initialSlug + (incrementSlug === 0 ? '' : '-' + incrementSlug);
      }
    }

    return slug;
  }
}
