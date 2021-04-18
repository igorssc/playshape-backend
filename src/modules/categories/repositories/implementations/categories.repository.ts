import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, PaginateModel, PaginateResult } from 'mongoose';
import { Category, CategoryDocument } from '../../entities/category.schema';
import { CreateCategoryInput } from '../../inputs/create-category.input';
import { ICategoriesRepository } from '../categories.repository.interface';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(category: CreateCategoryInput): Promise<Category> {
    const newCategory = new Category();

    Object.assign(newCategory, category);

    const repository = new this.categoryModel(newCategory);

    return await repository.save();
  }

  async listAll(
    page: number,
    limit: number,
  ): Promise<PaginateResult<CategoryDocument>> {
    const categories = await (this
      .categoryModel as PaginateModel<CategoryDocument>).paginate(
      {},
      { page, limit },
    );

    return categories;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ _id: id });

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ name: name });

    return category;
  }

  async update(id: string | ObjectId, data: any): Promise<Category> {
    const category = await this.categoryModel.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      },
    );

    return category;
  }
}
