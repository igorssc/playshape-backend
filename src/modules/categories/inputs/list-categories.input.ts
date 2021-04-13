import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ListCategoriesInput {
  @Field({ defaultValue: 1 })
  page: number;

  @Field({ defaultValue: 15 })
  limit: number;
}

export { ListCategoriesInput };
