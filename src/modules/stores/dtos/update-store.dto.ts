import { ObjectType } from '@nestjs/graphql';
import { StoreDTO } from './store.dto';

@ObjectType()
export class UpdateStoreDTO extends StoreDTO {}
