import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindCategoryInput {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;
}
