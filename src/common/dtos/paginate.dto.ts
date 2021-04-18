import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginateDTO {
  @Field()
  totalDocs: number;

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

  @Field({ nullable: true })
  prevPage: number;

  @Field({ nullable: true })
  nextPage: number;
}
