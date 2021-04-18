import { HttpException, HttpStatus } from '@nestjs/common';
import { compare } from 'bcrypt';
import { StatusUser } from '../../enuns/status-user.enum';

export const accountExists = async (account: any, password: string) => {
  if (!account) {
    throw new HttpException(
      'Email or password incorrect',
      HttpStatus.BAD_REQUEST,
    );
  }

  if (account.status != StatusUser.Active) {
    throw new HttpException('Blocked account', HttpStatus.FORBIDDEN);
  }

  const passwordMatch = await compare(password, account.password);

  if (!passwordMatch) {
    throw new HttpException(
      'Email or password incorrect',
      HttpStatus.BAD_REQUEST,
    );
  }
};
