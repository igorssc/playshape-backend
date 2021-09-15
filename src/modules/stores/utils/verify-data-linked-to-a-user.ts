import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindUserInput } from '../../accounts/inputs/find-user.input';
import { FindUserService } from '../../accounts/use-cases/find-user/find-user.service';

@Injectable()
export class VerifyDataLinkedToAUser {
  constructor(private findUserService: FindUserService) {}

  async verify(email: string) {
    try {
      const emailAlreadyExists = await this.findUserService.execute({
        email,
      } as FindUserInput);

      if (emailAlreadyExists) {
        throw new HttpException('Email linked to a user', HttpStatus.CONFLICT);
      }
    } catch (err) {
      if (err.message === 'Email linked to a user') {
        throw new HttpException(err.message, err.status);
      }
    }

    return true;
  }
}
