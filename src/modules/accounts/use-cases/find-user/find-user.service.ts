import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindUserDTO } from '../../dtos/find-user.dto';
import { FindUserInput } from '../../inputs/find-user.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
export class FindUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(user: FindUserInput, currentId?: string): Promise<FindUserDTO> {
    const args = Object.keys(user).length;

    if (args > 1) {
      throw new HttpException(
        'More than one search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (args === 0) {
      Object.assign(user, { _id: currentId });
    }

    const findUser = user._id
      ? await this.usersRepository.findById(user._id)
      : user?.email
      ? await this.usersRepository.findByEmail(user?.email)
      : user?.cpf
      ? await this.usersRepository.findByCpf(user?.cpf)
      : undefined;

    if (!findUser) {
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    }

    return findUser;
  }
}
