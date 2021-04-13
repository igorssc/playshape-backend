import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UpdateCategoryInputTypeCategory {
  @Field()
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;
}

@InputType()
class UpdateCategoryInput {
  @Field()
  token: string;

  @Field()
  category: UpdateCategoryInputTypeCategory;
}

export { UpdateCategoryInput, UpdateCategoryInputTypeCategory };
