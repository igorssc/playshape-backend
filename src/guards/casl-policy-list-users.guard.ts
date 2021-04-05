import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

import { AppAbility, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PolicyHandler } from '../casl/interfaces/IPolicy.handler';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
import { GetUser } from '../modules/accounts/common/get-user';
import { UsersRepository } from '../modules/accounts/repositories/implementations/users.repository';

@Injectable()
export class PoliciesGuardListUsers implements CanActivate {
  constructor(
    private readonly usersRepository: UsersRepository,
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private getUser: GetUser,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

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
        throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
      }

      const currentUser = await this.getUser.get(user_id);

      const ability = this.caslAbilityFactory.listUsers(currentUser);

      return policyHandlers.every((handler) =>
        this.execPolicyHandler(handler, ability),
      );
    } catch {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
