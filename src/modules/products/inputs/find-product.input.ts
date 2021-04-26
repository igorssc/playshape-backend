import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindProductInput {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  slug?: string;
}
