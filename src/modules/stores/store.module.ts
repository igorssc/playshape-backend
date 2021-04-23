import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../accounts/user.module';
import { Store, StoreSchema } from './entities/store.entity';
import { StoresRepository } from './repositories/implementations/stores.repository';
import { AuthenticateStoreResolver } from './use-cases/authenticate-store/authenticate-store.resolver';
import { AuthenticateStoreService } from './use-cases/authenticate-store/authenticate-store.service';
import { CreateStoreResolver } from './use-cases/create-store/create-store.resolver';
import { CreateStoreService } from './use-cases/create-store/create-store.service';
import { FindStoreResolver } from './use-cases/find-store/find-store.resolver';
import { FindStoreService } from './use-cases/find-store/find-store.service';
import { FindStoresByNameResolver } from './use-cases/find-stores-by-name/find-stores-by-name.resolver';
import { FindStoresByNameService } from './use-cases/find-stores-by-name/find-stores-by-name.service';
import { ListStoresResolver } from './use-cases/list-stores/list-stores.resolver';
import { ListStoresService } from './use-cases/list-stores/list-stores.service';
import { UpdateStoreResolver } from './use-cases/update-store/update-store.resolver';
import { UpdateStoreService } from './use-cases/update-store/update-store.service';
import { CreateSlug } from './utils/create-slug';
import { VerifyDataLinkedToAUser } from './utils/verify-data-linked-to-a-user';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [],
  providers: [
    CreateSlug,
    VerifyDataLinkedToAUser,
    StoresRepository,
    AuthenticateStoreResolver,
    AuthenticateStoreService,
    CreateStoreResolver,
    CreateStoreService,
    FindStoreResolver,
    FindStoreService,
    ListStoresResolver,
    ListStoresService,
    UpdateStoreResolver,
    UpdateStoreService,
    FindStoresByNameResolver,
    FindStoresByNameService,
  ],
  exports: [StoresRepository, FindStoreService],
})
export class StoreModule {}
