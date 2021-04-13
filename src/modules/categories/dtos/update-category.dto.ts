import { ObjectType } from '@nestjs/graphql';
import { CategoryDTO } from './category.dto';

@ObjectType()
class UpdateCategoryDTO extends CategoryDTO {}

export { UpdateCategoryDTO };
