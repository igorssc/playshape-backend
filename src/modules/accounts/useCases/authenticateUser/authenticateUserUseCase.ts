import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { ListUserAuthenticatedDTO } from '../../dtos/ListUserAuthenticatedDTO';
import { ListUserDTO } from '../../dtos/ListUserDTO';
import { LoginUserInput } from '../../inputs/LoginUser.input';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

@Injectable()
class AuthenticateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: LoginUserInput): Promise<ListUserAuthenticatedDTO> {
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

export { AuthenticateUserUseCase };
