import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

interface headerProps {
  authorization: string;
}

export const GetIdByToken = createParamDecorator(
  (_data, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context);

    try {
      const header: headerProps = ctx.getContext().req.headers;

      const [, token] = header.authorization.split(' ');

      const { sub: userId } = verify(token, process.env.JWT_KEY) as {
        sub: string;
      };
      return userId;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  },
);
