import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListProductsInput {
  @Field()
  page: number;

  @Field()
  limit: number;
}
