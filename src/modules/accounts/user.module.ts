import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './repositories/implementations/UsersRepository';
import { User, UserSchema } from './schema/user.schema';
import { CreateUserResolver } from './useCases/createUser/CreateUserResolver';
import { CreateUsersUseCase } from './useCases/createUser/CreateUserUseCase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersRepository, CreateUserResolver, CreateUsersUseCase],
})
export class UsersModule {}
