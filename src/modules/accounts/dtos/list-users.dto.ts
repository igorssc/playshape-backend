import { Field, ObjectType } from '@nestjs/graphql';

import { UserDTO } from './user.dto';

@ObjectType()
export class ListUsersDTO {
  @Field(() => [UserDTO])
  docs: UserDTO[];
  @Field()
  totalDocs: number;
  @Field()
  offset: number;
  @Field()
  limit: number;
  @Field()
  totalPages: number;
  @Field()
  page: number;
  @Field()
  pagingCounter: number;
  @Field()
  hasPrevPage: boolean;
  @Field()
  hasNextPage: boolean;
  @Field()
  prevPage: number;
  @Field()
  nextPage: number;
}
