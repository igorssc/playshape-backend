import { CreateUserInput } from '../inputs/create-user.input';
import { User } from '../entities/user.schema';

interface IUsersRepository {
  create(user: CreateUserInput): Promise<User>;
  listAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(id: string, data: any): Promise<User>;
}

export { IUsersRepository };
