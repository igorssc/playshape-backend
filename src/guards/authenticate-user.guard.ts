import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { StatusUser } from '../enuns/status-user.enum';
import { UsersRepository } from '../modules/accounts/repositories/implementations/users.repository';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());

    const ctx = GqlExecutionContext.create(context);
    const { input } = ctx.getArgs();

    try {
      const { sub: user_id } = verify(
        input.token,
        process.env.KEY_AUTHENTICATE,
      ) as {
        sub: string;
      };
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
      }

      if (user.status != StatusUser.Active) {
        throw new HttpException('Blocked user', HttpStatus.FORBIDDEN);
      }

      if (role) {
        if (
          !user.permissions.some((permission) => String(permission) == role)
        ) {
          throw new HttpException(
            'You are not authorized to perform that action',
            HttpStatus.FORBIDDEN,
          );
        }
      }

      return true;
    } catch (err) {
      throw new HttpException(
        err.response || 'Invalid token',
        err.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
