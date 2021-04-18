import { PaginateResult } from 'mongoose';
import { User, UserDocument } from '../entities/user.entity';
import { CreateUserInput } from '../inputs/create-user.input';

export interface IUsersRepository {
  create(user: CreateUserInput): Promise<User>;
  listAll(page: number, limit: number): Promise<PaginateResult<UserDocument>>;
  findByEmail(email: string): Promise<User>;
  findByCpf(cpf: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(id: string, data: any): Promise<User>;
}
