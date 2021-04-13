import { ObjectType } from '@nestjs/graphql';
import { CategoryDTO } from './category.dto';

@ObjectType()
class ListCategoryDTO extends CategoryDTO {}

export { ListCategoryDTO };
