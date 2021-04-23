import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslAbilityFactory } from '../../casl/implementations/casl-ability.factory';
import { StoreModule } from '../stores/store.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './repositories/implementations/users.repository';
import { AuthenticateUserResolver } from './use-cases/authenticate-user/authenticate-user.resolver';
import { AuthenticateUserService } from './use-cases/authenticate-user/authenticate-user.service';
import { CreateUserResolver } from './use-cases/create-user/create-user.resolver';
import { CreateUsersService } from './use-cases/create-user/create-user.service';
import { FindUserResolver } from './use-cases/find-user/find-user.resolver';
import { FindUserService } from './use-cases/find-user/find-user.service';
import { ListUsersResolver } from './use-cases/list-users/list-users.resolver';
import { ListUsersService } from './use-cases/list-users/list-users.service';
import { UpdateUserResolver } from './use-cases/update-user/update-user.resolver';
import { UpdateUserService } from './use-cases/update-user/update-user.service';
import { VerifyDataLinkedToAStore } from './utils/verify-email-linked-to-a-store';

@Module({
  imports: [
    forwardRef(() => StoreModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    VerifyDataLinkedToAStore,
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
  exports: [UsersRepository, CaslAbilityFactory, FindUserService],
})
export class UsersModule {}
