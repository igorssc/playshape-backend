import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Variant, VariantDocument } from '../../entities/variant.entity';
import { CreateVariantInput } from '../../inputs/create-variant.input';
import { IVariantsRepository } from '../variants.repository.interface';

@Injectable()
export class VariantsRepository implements IVariantsRepository {
  constructor(
    @InjectModel(Variant.name)
    private variantModel: Model<VariantDocument>,
  ) {}

  async create(variant: CreateVariantInput): Promise<Variant> {
    const newVariant = new Variant();

    Object.assign(newVariant, variant);

    const repository = new this.variantModel(newVariant);

    return await repository.save();
  }

  async findByProduct(product: ObjectId): Promise<Variant[]> {
    const variants = await this.variantModel.find({ product }).sort('price');

    return variants;
  }

  async findById(_id: string | ObjectId): Promise<Variant> {
    const variant = await this.variantModel.findOne({ _id });

    return variant;
  }

  async update(_id: string, data: any): Promise<Variant> {
    const variant = await this.variantModel.findOneAndUpdate({ _id }, data, {
      new: true,
    });

    return variant;
  }
}
