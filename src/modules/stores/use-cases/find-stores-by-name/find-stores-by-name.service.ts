import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindStoresByNameInput } from '../../inputs/find-stores-by-name.input';
import { StoresRepository } from '../../repositories/implementations/stores.repository';

@Injectable()
export class FindStoresByNameService {
  constructor(private readonly storesRepository: StoresRepository) {}

  async execute({ name, page, limit }: FindStoresByNameInput) {
    const stores = await this.storesRepository.findByName(name, page, limit);

    if (!stores) {
      throw new HttpException('Store does not exists', HttpStatus.NOT_FOUND);
    }

    delete Object.assign(stores, { stores: stores.docs })['docs'];

    return stores;
  }
}
