import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { ListUserDTO } from '../../dtos/list-user.dto';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
class CreateUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserInput): Promise<ListUserDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const passwordHash = await hash(password, 8);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
    return (createdUser as unknown) as ListUserDTO;
  }
}

export { CreateUsersService };
