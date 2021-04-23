import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindProductInput {
  @Field()
  _id: string;
}
