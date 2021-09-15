import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';
import { VerifyDataLinkedToAStore } from '../../utils/verify-data-linked-to-a-store';

@Injectable()
export class CreateUsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly verifyDataLinkedToAStore: VerifyDataLinkedToAStore,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserInput): Promise<CreateUserDTO> {
    email = email.toLowerCase();

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    await this.verifyDataLinkedToAStore.verifyEmail(email);

    const passwordHash = await hash(password, 8);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
    return createdUser;
  }
}
