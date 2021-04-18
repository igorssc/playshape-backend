import { ObjectType } from '@nestjs/graphql';
import { CategoryDTO } from './category.dto';

@ObjectType()
export class UpdateCategoryDTO extends CategoryDTO {}
