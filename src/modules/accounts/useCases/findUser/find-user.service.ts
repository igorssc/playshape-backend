import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindUserDTO } from '../../dtos/find-user.dto';
import { UsersRepository } from '../../repositories/implementations/users.repository';

interface FindUserServiceProps {
  _id?: string;
  email?: string;
  cpf?: string;
}

@Injectable()
class FindUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    user: FindUserServiceProps,
    idCurrentUser?: string,
  ): Promise<FindUserDTO> {
    let args = 0;
    user?._id && ++args;
    user?.email && ++args;
    user?.cpf && ++args;

    if (args > 1) {
      throw new HttpException(
        'More than one search parameter entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = args === 0 ? idCurrentUser : user?._id;

    if (!user && !idCurrentUser) {
      throw new HttpException(
        'No search parameters entered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findUser = id
      ? await this.usersRepository.findById(id)
      : user?.email
      ? await this.usersRepository.findByEmail(user?.email)
      : user?.cpf
      ? await this.usersRepository.findByCpf(user?.cpf)
      : undefined;

    if (!findUser) {
      throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
    }

    return findUser;
  }
}

export { FindUserService };
