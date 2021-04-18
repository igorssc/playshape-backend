import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListUsersInput {
  @Field()
  page: number;

  @Field()
  limit: number;
}
