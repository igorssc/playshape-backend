import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ListUserDTO } from '../../dtos/ListUserDTO';
import { UpdateUserInput } from '../../inputs/UpdateUserInput';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

@Injectable()
class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string, user: UpdateUserInput): Promise<ListUserDTO> {
    if (user.email) {
      const userAlreadyExists = await this.usersRepository.findByEmail(
        user.email,
      );

      if (
        userAlreadyExists &&
        ((userAlreadyExists as unknown) as ListUserDTO)._id != userId
      ) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
    }
    const updatedUser = this.usersRepository.update(userId, user);

    return (updatedUser as unknown) as ListUserDTO;
  }
}

export { UpdateUserUseCase };
