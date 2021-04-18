import { Field, ObjectType } from '@nestjs/graphql';
import { StoreDTO } from './store.dto';

@ObjectType()
export class AuthenticateStoreDTO {
  @Field()
  store: StoreDTO;
  @Field()
  token: string;
}
