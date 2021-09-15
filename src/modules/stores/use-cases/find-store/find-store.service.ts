import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateObjectId } from '../../../../utils/validations/validate-objectid';
import { FindStoreInput } from '../../inputs/find-store.input';
import { StoresRepository } from '../../repositories/implementations/stores.repository';

@Injectable()
export class FindStoreService {
  constructor(private readonly storesRepository: StoresRepository) {}

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

    if (store._id) {
      validateObjectId(store._id);
    }

    const findStore = store._id
      ? await this.storesRepository.findById(store._id)
      : store.email
      ? await this.storesRepository.findByEmail(store.email)
      : store.cnpj
      ? await this.storesRepository.findByCnpj(store.cnpj)
      : store.slug
      ? await this.storesRepository.findBySlug(store.slug)
      : undefined;

    if (!findStore) {
      throw new HttpException('Store does not exists', HttpStatus.NOT_FOUND);
    }

    return findStore;
  }
}
