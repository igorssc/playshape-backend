import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../IUsers.repository';
import { User, UserDocument } from '../../entities/user.schema';
import { CreateUserInput } from '../../inputs/create-user.input';

@Injectable()
class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserInput): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, user);

    const repository = new this.userModel(newUser);

    return await repository.save();
  }

  async listAll(
    page: number,
    limit: number,
  ): Promise<PaginateResult<UserDocument>> {
    const users = await (this
      .userModel as PaginateModel<UserDocument>).paginate({}, { page, limit });

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });

    return user;
  }

  async update(id: string, data: any): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return user;
  }
}

export { UsersRepository };
