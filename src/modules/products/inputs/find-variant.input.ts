import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindVariantInput {
  @Field()
  _id: string;
}
