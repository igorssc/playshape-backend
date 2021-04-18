import { ObjectType } from '@nestjs/graphql';
import { Store } from '../entities/store.entity';

@ObjectType()
export class StoreDTO extends Store {}
