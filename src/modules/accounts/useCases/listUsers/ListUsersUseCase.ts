import { Injectable } from '@nestjs/common';

import { ListUserDTO } from '../../dtos/ListUserDTO';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

@Injectable()
class ListUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<ListUserDTO[]> {
    const users = await this.usersRepository.listAll();
    return (users as unknown) as ListUserDTO[];
  }
}

export { ListUsersUseCase };
