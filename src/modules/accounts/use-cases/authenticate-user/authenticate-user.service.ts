import { Injectable } from '@nestjs/common';
import { generateToken } from '../../../../common/auth/generate-token';
import { accountExists } from '../../../../common/validations/account-exists';
import { AuthenticateUserInput } from '../../inputs/authenticate-user.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
export class AuthenticateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUserInput) {
    const wantedUser = await this.usersRepository.findByEmail(email);

    await accountExists(wantedUser, password);

    const user = await this.usersRepository.update(wantedUser._id, {
      last_login: new Date(),
    });

    const token = generateToken(String(user._id));

    return { user, token };
  }
}
