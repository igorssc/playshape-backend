import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../IUsersRepository';
import { User, UserDocument } from '../../schema/user.schema';
import { CreateUserInput } from '../../inputs/CreateUser.input';

@Injectable()
class UsersRepository implements IUsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserInput): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, user);

    const userModel = new this.userModel(newUser);

    return userModel.save();
  }
}

export { UsersRepository };
