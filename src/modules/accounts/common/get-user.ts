import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.schema';
import { UsersRepository } from '../repositories/implementations/users.repository';

@Injectable()
class GetUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async get(userId: string): Promise<User> {
    return await this.usersRepository.findById(userId);
  }
}

export { GetUser };
