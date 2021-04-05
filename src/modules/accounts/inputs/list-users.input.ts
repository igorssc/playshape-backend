import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ListUsersInput {
  @Field()
  token: string;

  @Field({ defaultValue: 1 })
  page: number;

  @Field({ defaultValue: 15 })
  limit: number;
}

export { ListUsersInput };
