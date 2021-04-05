import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

export const GetUserIdDecorator = createParamDecorator(
  (_data, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context);
    const { input } = ctx.getArgs();
    const { sub: userId } = verify(
      input.token,
      process.env.KEY_AUTHENTICATE,
    ) as {
      sub: string;
    };

    return userId;
  },
);
