import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, PaginateModel, PaginateResult } from 'mongoose';
import { User, UserDocument } from '../../entities/user.schema';
import { CreateUserInput } from '../../inputs/create-user.input';
import { IUsersRepository } from '../IUsers.repository';

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
    const teste = await this.userModel.aggregate([
      {
        $match: { email: 'igorsantoscosta@gmail.com' },
      },
      {
        $project: { email: 1, address: 1 },
      },
    ]);

    const users = await (this
      .userModel as PaginateModel<UserDocument>).paginate({}, { page, limit });

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.userModel.findOne({ cpf });

    return user;
  }

  async findById(_id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id });

    return user;
  }

  async update(id: string | ObjectId, data: any): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return user;
  }
}

export { UsersRepository };

