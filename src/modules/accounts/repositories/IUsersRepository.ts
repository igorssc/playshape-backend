import { CreateUserInput } from '../inputs/CreateUser.input';
import { User } from '../schema/user.schema';

interface IUsersRepository {
  create(user: CreateUserInput): Promise<User>;
}

export { IUsersRepository };
