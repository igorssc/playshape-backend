import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { Product, ProductDocument } from '../../entities/product.entity';
import { CreateProductInput } from '../../inputs/create-product.input';
import { IProductsRepository } from '../product.repository.interface';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(product: CreateProductInput): Promise<Product> {
    const newProduct = new Product();

    Object.assign(newProduct, product);

    const repository = new this.productModel(newProduct);

    return await repository.save();
  }

  async listAll(
    page: number,
    limit: number,
  ): Promise<PaginateResult<ProductDocument>> {
    const products = await (this
      .productModel as PaginateModel<ProductDocument>).paginate(
      {},
      { page, limit },
    );

    return products;
  }
}
