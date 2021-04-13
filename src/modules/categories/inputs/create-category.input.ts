import { Field, InputType } from '@nestjs/graphql';

@InputType()
class Category {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
class CreateCategoryInput {
  @Field()
  token: string;

  @Field()
  category: Category;
}

export { CreateCategoryInput };
