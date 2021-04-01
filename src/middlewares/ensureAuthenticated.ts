import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
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
        throw new Error('User does not exists!');
      }

      return true;
    } catch {
      throw new Error('Invalid token!');
    }
  }
}
