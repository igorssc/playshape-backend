import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryDTO } from './category.dto';

@ObjectType()
export class ListCategoriesDTO {
  @Field(() => [CategoryDTO])
  categories: CategoryDTO[];
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
  @Field()
  prevPage: number;
  @Field()
  nextPage: number;
}
