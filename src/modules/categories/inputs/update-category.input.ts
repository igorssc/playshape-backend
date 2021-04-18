import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field()
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;
}
