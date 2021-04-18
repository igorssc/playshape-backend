import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindStoresByNameInput {
  @Field({ defaultValue: 1 })
  page: number;

  @Field({ defaultValue: 15 })
  limit: number;

  @Field()
  name: string;
}
