import { PaginateResult } from 'mongoose';
import { Category, CategoryDocument } from '../entities/category.schema';
import { CreateCategoryInput } from '../inputs/create-category.input';

export interface ICategoriesRepository {
  create(user: CreateCategoryInput): Promise<Category>;
  listAll(
    page: number,
    limit: number,
  ): Promise<PaginateResult<CategoryDocument>>;
  findById(id: string): Promise<Category>;
  findBySlug(slug: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  update(id: string, data: any): Promise<Category>;
}
