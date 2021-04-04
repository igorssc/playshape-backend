import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/users.repository';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private readonly usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { token } = ctx.getArgs();

    try {
      const { sub: user_id } = verify(token, process.env.KEY_AUTHENTICATE) as {
        sub: string;
      };
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
      }

      return true;
    } catch {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }
  }
}
