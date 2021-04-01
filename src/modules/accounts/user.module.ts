import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersRepository } from './repositories/implementations/UsersRepository';
import { User, UserSchema } from './schema/user.schema';
import { AuthenticateUserResolver } from './useCases/authenticateUser/authenticateUserResolver';
import { AuthenticateUserUseCase } from './useCases/authenticateUser/authenticateUserUseCase';
import { CreateUserResolver } from './useCases/createUser/CreateUserResolver';
import { CreateUsersUseCase } from './useCases/createUser/CreateUserUseCase';
import { ListUsersResolver } from './useCases/listUsers/ListUsersResolver';
import { ListUsersUseCase } from './useCases/listUsers/ListUsersUseCase';
import { UpdateUserResolver } from './useCases/UpdateUser/UpdateUserResolver';
import { UpdateUserUseCase } from './useCases/UpdateUser/UpdateUserUseCase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersRepository,
    CreateUserResolver,
    CreateUsersUseCase,
    ListUsersResolver,
    ListUsersUseCase,
    AuthenticateUserResolver,
    AuthenticateUserUseCase,
    UpdateUserResolver,
    UpdateUserUseCase,
  ],
})
export class UsersModule {}
