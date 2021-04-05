import { Injectable } from '@nestjs/common';

import { ListUsersDTO } from '../../dtos/list-users.dto';
import { ListUsersInput } from '../../inputs/list-users.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
class ListUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ page, limit }: ListUsersInput): Promise<ListUsersDTO> {
    const users = await this.usersRepository.listAll(page, limit);

    return users as ListUsersDTO;
  }
}

export { ListUsersService };
