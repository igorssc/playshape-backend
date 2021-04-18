import { Injectable } from '@nestjs/common';
import { generateToken } from '../../../../common/auth/generate-token';
import { accountExists } from '../../../../common/validations/account-exists';
import { StoreRepository } from '../../repositories/implementations/store.repository';

@Injectable()
export class AuthenticateStoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute({ email, password }) {
    const storeExists = await this.storeRepository.findByEmail(email);

    await accountExists(storeExists, password);

    const store = await this.storeRepository.update(storeExists._id, {
      last_login: new Date(),
    });

    const token = generateToken(String(store._id));

    return { store, token };
  }
}
