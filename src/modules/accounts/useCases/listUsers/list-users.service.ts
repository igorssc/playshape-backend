import { Injectable } from '@nestjs/common';

import { ListUserDTO } from '../../dtos/list-user.dto';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
class ListUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<ListUserDTO[]> {
    const users = await this.usersRepository.listAll();
    return (users as unknown) as ListUserDTO[];
  }
}

export { ListUsersService };
