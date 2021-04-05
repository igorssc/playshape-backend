import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { ListUserAuthenticatedDTO } from '../../dtos/list-user-authenticated.dto';
import { ListUserDTO } from '../../dtos/list-user.dto';
import { AuthenticateUserInput } from '../../inputs/authenticate-user.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
class AuthenticateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserInput): Promise<ListUserAuthenticatedDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = sign({}, process.env.KEY_AUTHENTICATE, {
      subject: String(((user as unknown) as ListUserDTO)._id),
      expiresIn: '1d',
    });
    return ({ user, token } as unknown) as ListUserAuthenticatedDTO;
  }
}

export { AuthenticateUserService };
