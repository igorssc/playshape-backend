import { Injectable } from '@nestjs/common';
import { ListStoresInput } from '../../inputs/list-stores.input';
import { StoreRepository } from '../../repositories/implementations/store.repository';

@Injectable()
export class ListStoresService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute({ page, limit }: ListStoresInput) {
    console.log(page);
    const stores = await this.storeRepository.listAllStores(page, limit);

    delete Object.assign(stores, { stores: stores.docs })['docs'];

    return stores;
  }
}
