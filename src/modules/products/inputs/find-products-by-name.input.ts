import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindProductsByNameInput {
  @Field()
  name: string;
}
