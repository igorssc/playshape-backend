import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { ListUserDTO } from '../../dtos/ListUserDTO';
import { CreateUserInput } from '../../inputs/CreateUser.input';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

@Injectable()
class CreateUsersUseCase {
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

export { CreateUsersUseCase };
