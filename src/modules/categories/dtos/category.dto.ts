import { ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.schema';

@ObjectType()
export class CategoryDTO extends Category {}
