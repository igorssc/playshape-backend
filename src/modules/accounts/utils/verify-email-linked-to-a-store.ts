import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindStoreInput } from '../../stores/inputs/find-store.input';
import { FindStoreService } from '../../stores/use-cases/find-store/find-store.service';

@Injectable()
class VerifyDataLinkedToAStore {
  constructor(private findStoreService: FindStoreService) {}

  async verifyEmail(email: string) {
    try {
      const emailAlreadyExists = await this.findStoreService.execute({
        email,
      } as FindStoreInput);

      if (emailAlreadyExists) {
        throw new HttpException('Email linked to a store', HttpStatus.CONFLICT);
      }
    } catch (err) {
      if (err.status === HttpStatus.CONFLICT) {
        throw new HttpException(err.message, err.status);
      }
    }

    return true;
  }

  async verifyCPF(cpf: string) {
    try {
      const cpfAlreadyExists = await this.findStoreService.execute({
        cpf,
      } as FindStoreInput);

      if (cpfAlreadyExists) {
        throw new HttpException('CPF linked to a store', HttpStatus.CONFLICT);
      }
    } catch (err) {
      if (err.status === HttpStatus.CONFLICT) {
        throw new HttpException(err.message, err.status);
      }
    }

    return true;
  }
}

export { VerifyDataLinkedToAStore };
