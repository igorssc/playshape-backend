import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

export const validateObjectId = (id: string, message?: string) => {
  try {
    Types.ObjectId(id);

    return true;
  } catch {
    throw new HttpException(
      message ?? 'invalid informed Id',
      HttpStatus.BAD_REQUEST,
    );
  }
};
