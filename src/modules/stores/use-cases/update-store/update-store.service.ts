import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { cnpj as validarCnpj } from 'cpf-cnpj-validator';
import { uploadFile } from '../../../../config/upload';
import { deleteFile } from '../../../../storage/delete';
import { UpdateStoreInput } from '../../inputs/update-store.input';
import { StoresRepository } from '../../repositories/implementations/stores.repository';
import { VerifyDataLinkedToAUser } from '../../utils/verify-data-linked-to-a-user';

@Injectable()
export class UpdateStoreService {
  constructor(
    private readonly storesRepository: StoresRepository,
    private readonly verifyDataLinkedToAUser: VerifyDataLinkedToAUser,
  ) {}

  async execute(storeId: string, store: UpdateStoreInput) {
    if (store.cnpj) {
      const cnpjIsValid = validarCnpj.isValid(store.cnpj);

      if (!cnpjIsValid) {
        throw new HttpException(
          'CNPJ informed with format invalid',
          HttpStatus.BAD_REQUEST,
        );
      }

      const storeAlreadyExists = await this.storesRepository.findByCnpj(
        store.cnpj,
      );

      if (storeAlreadyExists && String(storeAlreadyExists._id) != storeId) {
        throw new HttpException('CNPJ already exists', HttpStatus.CONFLICT);
      }

      Object.assign(store, { cpf: null });
    }

    if (store._id) {
      const storeExists = await this.storesRepository.findById(store._id);

      if (!storeExists) {
        throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
      }

      delete store._id;
    }

    if (store.slug) {
      const storeExists = await this.storesRepository.findBySlug(store.slug);

      if (!storeExists) {
        throw new HttpException('Slug already exists', HttpStatus.NOT_FOUND);
      }
    }

    if (store.email) {
      store.email = store.email.toLowerCase();

      const storeAlreadyExists = await this.storesRepository.findByEmail(
        store.email,
      );

      if (storeAlreadyExists && String(storeAlreadyExists._id) != storeId) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      await this.verifyDataLinkedToAUser.verifyEmail(store.email);
    }

    if (store.profile_picture) {
      const currentUser = await this.storesRepository.findById(storeId);

      const picture = await store.profile_picture;

      const path = await uploadFile(picture, 'image', 'store_pictures');
      if (currentUser['profile_picture']) {
        await deleteFile(currentUser.profile_picture.filename);
      }

      Object.assign(store, { profile_picture: path });
    }

    if (store.password) {
      const passwordHash = await hash(store.password, 8);

      Object.assign(store, { password: passwordHash });
    }

    Object.assign(store, { updated_at: new Date() });

    const updatedStore = await this.storesRepository.update(storeId, store);

    return updatedStore;
  }
}
