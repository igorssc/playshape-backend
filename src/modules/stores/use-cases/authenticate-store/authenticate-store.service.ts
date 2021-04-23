import { Injectable } from '@nestjs/common';
import { generateToken } from '../../../../common/auth/generate-token';
import { accountExists } from '../../../../common/validations/account-exists';
import { StoresRepository } from '../../repositories/implementations/stores.repository';

@Injectable()
export class AuthenticateStoreService {
  constructor(private readonly storesRepository: StoresRepository) {}

  async execute({ email, password }) {
    const storeExists = await this.storesRepository.findByEmail(email);

    await accountExists(storeExists, password);

    const store = await this.storesRepository.update(storeExists._id, {
      last_login: new Date(),
    });

    const token = generateToken(String(store._id));

    return { store, token };
  }
}
