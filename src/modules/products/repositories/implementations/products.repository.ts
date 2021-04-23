import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { StatusProduct } from '../../../../enuns/status-product';
import { Category } from '../../../categories/entities/category.schema';
import { Store } from '../../../stores/entities/store.entity';
import { Product, ProductDocument } from '../../entities/product.entity';
import { CreateProductInput } from '../../inputs/create-product.input';
import { IProductsRepository } from '../products.repository.interface';

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
      {
        page,
        limit,
        populate: [
          { path: 'category', model: Category },
          { path: 'store', model: Store },
        ],
      },
    );

    return products;
  }

  async findById(_id: string): Promise<Product> {
    const product = await this.productModel
      .find({ _id, status: { $ne: StatusProduct.Removed } })
      .populate([
        { path: 'category', model: Category },
        { path: 'store', model: Store },
      ]);

    return product[0];
  }

  async findByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginateResult<ProductDocument>> {
    const products = await (this
      .productModel as PaginateModel<ProductDocument>).paginate(
      {
        name: { $regex: name, $options: 'i' },
        status: { $ne: StatusProduct.Removed },
      },
      {
        page,
        limit,
        populate: [
          { path: 'category', model: Category },
          { path: 'store', model: Store },
        ],
      },
    );

    return products;
  }

  async update(_id: string, data: any): Promise<Product> {
    const product = await this.productModel.findOneAndUpdate({ _id }, data, {
      new: true,
    });

    return product;
  }
}