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
import { FindUserInput } from '../modules/accounts/inputs/find-user.input';
import { FindUserService } from '../modules/accounts/use-cases/find-user/find-user.service';

interface headerProps {
  authorization: string;
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(
    private readonly findUserService: FindUserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());

    const ctx = GqlExecutionContext.create(context);

    try {
      const header: headerProps = ctx.getContext().req.headers;

      const [, token] = header.authorization.split(' ');

      const { sub: user_id } = verify(token, process.env.JWT_KEY) as {
        sub: string;
      };

      const user = await this.findUserService.execute({
        _id: user_id,
      } as FindUserInput);

      if (user.status != StatusUser.Active) {
        throw new HttpException('Blocked user', HttpStatus.FORBIDDEN);
      }

      if (role) {
        if (
          !user.isAdmin ||
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
