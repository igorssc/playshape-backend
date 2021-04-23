import { Injectable } from '@nestjs/common';
import { ListStoresInput } from '../../inputs/list-stores.input';
import { StoresRepository } from '../../repositories/implementations/stores.repository';

@Injectable()
export class ListStoresService {
  constructor(private readonly storesRepository: StoresRepository) {}

  async execute({ page, limit }: ListStoresInput) {
    const stores = await this.storesRepository.listAllStores(page, limit);

    delete Object.assign(stores, { stores: stores.docs })['docs'];

    return stores;
  }
}
