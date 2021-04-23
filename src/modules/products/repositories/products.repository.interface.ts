import { PaginateResult } from 'mongoose';
import { Product, ProductDocument } from '../entities/product.entity';
import { CreateProductInput } from '../inputs/create-product.input';

export interface IProductsRepository {
  create(user: CreateProductInput): Promise<Product>;
  listAll(
    page: number,
    limit: number,
  ): Promise<PaginateResult<ProductDocument>>;
  findById(_id: string): Promise<Product>;
  findByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginateResult<ProductDocument>>;
  update(_id: string, data: any): Promise<Product>;
}
