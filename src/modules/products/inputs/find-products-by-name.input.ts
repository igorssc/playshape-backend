import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindProductsByNameInput {
  @Field()
  name: string;

  @Field({ defaultValue: 1, nullable: true })
  page: number;

  @Field({ defaultValue: 15, nullable: true })
  limit: number;
}
