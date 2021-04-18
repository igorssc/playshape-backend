import { Injectable } from '@nestjs/common';
import { ListUsersInput } from '../../inputs/list-users.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
export class ListUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ page, limit }: ListUsersInput) {
    const users = await this.usersRepository.listAll(page, limit);

    delete Object.assign(users, { users: users.docs })['docs'];

    return users;
  }
}
