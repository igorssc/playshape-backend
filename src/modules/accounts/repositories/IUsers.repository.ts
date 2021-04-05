import { PaginateResult } from 'mongoose';

import { CreateUserInput } from '../inputs/create-user.input';
import { User, UserDocument } from '../entities/user.schema';

interface IUsersRepository {
  create(user: CreateUserInput): Promise<User>;
  listAll(page: number, limit: number): Promise<PaginateResult<UserDocument>>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(id: string, data: any): Promise<User>;
}

export { IUsersRepository };
