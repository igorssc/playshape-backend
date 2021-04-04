import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

import { AppAbility, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { PolicyHandler } from '../casl/interfaces/IPolicy.handler';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
import { GetUser } from '../modules/accounts/common/get-user';

@Injectable()
export class PoliciesGuardListUsers implements CanActivate {
  constructor(
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
    const { token, user: editUser } = ctx.getArgs();

    const { sub: user_id } = verify(token, process.env.KEY_AUTHENTICATE) as {
      sub: string;
    };

    const currentUser = await this.getUser.get(user_id);

    const ability = this.caslAbilityFactory.listUsers(currentUser);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
