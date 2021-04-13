import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { User, UserSchema } from './entities/user.schema';
import { UsersRepository } from './repositories/implementations/users.repository';
import { AuthenticateUserResolver } from './useCases/authenticateUser/authenticateUser.resolver';
import { AuthenticateUserService } from './useCases/authenticateUser/authenticateUser.service';
import { CreateUserResolver } from './useCases/createUser/create-user.resolver';
import { CreateUsersService } from './useCases/createUser/create-user.service';
import { FindUserResolver } from './useCases/findUser/find-user.resolver';
import { FindUserService } from './useCases/findUser/find-user.service';
import { ListUsersResolver } from './useCases/listUsers/list-users.resolver';
import { ListUsersService } from './useCases/listUsers/list-users.service';
import { UpdateUserResolver } from './useCases/updateUser/update-user.resolver';
import { UpdateUserService } from './useCases/updateUser/update-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    CaslAbilityFactory,
    UsersRepository,
    AuthenticateUserResolver,
    AuthenticateUserService,
    CreateUserResolver,
    CreateUsersService,
    ListUsersResolver,
    ListUsersService,
    UpdateUserResolver,
    UpdateUserService,
    FindUserResolver,
    FindUserService,
  ],
  exports: [UsersRepository, CaslAbilityFactory],
})
export class UsersModule {}
