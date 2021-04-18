import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListStoresInput {
  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  limit: number;
}
