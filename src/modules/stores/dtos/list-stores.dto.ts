import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateDTO } from '../../../common/dtos/paginate.dto';
import { StoreDTO } from './store.dto';

@ObjectType()
export class ListStoresDTO extends PaginateDTO {
  @Field(() => [StoreDTO], { defaultValue: [] })
  stores: StoreDTO[];
}
