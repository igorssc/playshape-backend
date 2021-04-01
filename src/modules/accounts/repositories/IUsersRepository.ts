import { CreateUserInput } from '../inputs/CreateUser.input';
import { User } from '../schema/user.schema';

interface IUsersRepository {
  create(user: CreateUserInput): Promise<User>;
  listAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(id: string, data: any): Promise<User>;
}

export { IUsersRepository };
