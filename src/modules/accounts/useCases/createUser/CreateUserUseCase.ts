import { Injectable } from '@nestjs/common';

import { CreateUserInput } from '../../inputs/CreateUser.input';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { User } from '../../schema/user.schema';

@Injectable()
class CreateUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(user: CreateUserInput): Promise<User> {
    const createdUser = await this.usersRepository.create(user);
    return createdUser;
  }
}

export { CreateUsersUseCase };
