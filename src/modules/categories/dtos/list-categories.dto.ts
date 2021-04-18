import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateDTO } from '../../../common/dtos/paginate.dto';
import { CategoryDTO } from './category.dto';

@ObjectType()
export class ListCategoriesDTO extends PaginateDTO {
  @Field(() => [CategoryDTO])
  categories: CategoryDTO[];
}
