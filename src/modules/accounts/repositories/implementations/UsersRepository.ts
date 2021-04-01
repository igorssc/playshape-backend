import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../IUsersRepository';
import { User, UserDocument } from '../../schema/user.schema';
import { CreateUserInput } from '../../inputs/CreateUser.input';

@Injectable()
class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name) private repository: Model<UserDocument>,
  ) {}

  async create(user: CreateUserInput): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, user);

    const repository = new this.repository(newUser);

    return await repository.save();
  }

  async listAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ _id: id });

    return user;
  }

  async update(id: string, data: any): Promise<User> {
    const user = await this.repository.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return user;
  }
}

export { UsersRepository };
