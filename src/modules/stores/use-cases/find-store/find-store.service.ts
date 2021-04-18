import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindStoreInput } from '../../inputs/find-store.input';
import { StoreRepository } from '../../repositories/implementations/store.repository';

@Injectable()
export class FindStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(store: FindStoreInput) {
    const args = Object.keys(store).length;

    if (args === 0) {
      throw new HttpException(
        'No search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (args > 1) {
      throw new HttpException(
        'More than one search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findStore = store._id
      ? await this.storeRepository.findById(store._id)
      : store.email
      ? await this.storeRepository.findByEmail(store.email)
      : store.cpf
      ? await this.storeRepository.findByCpf(store.cpf)
      : store.slug
      ? await this.storeRepository.findBySlug(store.slug)
      : undefined;

    if (!findStore) {
      throw new HttpException('Store does not exists', HttpStatus.NOT_FOUND);
    }

    return findStore;
  }
}
