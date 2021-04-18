import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListCategoriesInput {
  @Field()
  page: number;

  @Field()
  limit: number;
}
