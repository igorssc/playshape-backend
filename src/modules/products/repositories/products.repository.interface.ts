import { PaginateResult } from 'mongoose';
import { Product, ProductDocument } from '../entities/product.entity';

export interface IProductsRepository {
  create(user: {}): Promise<Product>;
  listAll(
    page: number,
    limit: number,
  ): Promise<PaginateResult<ProductDocument>>;
  findById(_id: string): Promise<Product>;
  findBySlug(slug: string): Promise<Product>;
  findByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginateResult<ProductDocument>>;
  findByStoreId(
    store: string,
    page: number,
    limit: number,
  ): Promise<PaginateResult<ProductDocument>>;
  findByCategoryId(
    category: string,
    page: number,
    limit: number,
  ): Promise<PaginateResult<ProductDocument>>;
  update(_id: string, data: any): Promise<Product>;
}
