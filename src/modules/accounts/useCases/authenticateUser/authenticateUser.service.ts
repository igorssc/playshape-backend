import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { StatusUser } from '../../../../enuns/status-user.enum';
import { FindUserAuthenticatedDTO } from '../../dtos/find-user-authenticated.dto';
import { AuthenticateUserInput } from '../../inputs/authenticate-user.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
class AuthenticateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserInput): Promise<FindUserAuthenticatedDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userAlreadyExists.status != StatusUser.Active) {
      throw new HttpException('Blocked user', HttpStatus.FORBIDDEN);
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersRepository.update(userAlreadyExists._id, {
      last_login: new Date(),
    });

    const token = sign({}, process.env.KEY_AUTHENTICATE, {
      subject: String(user._id),
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export { AuthenticateUserService };
