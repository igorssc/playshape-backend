import { ObjectId } from 'mongoose';
import { Variant } from '../entities/variant.entity';
import { CreateVariantInput } from '../inputs/create-variant.input';

export interface IVariantsRepository {
  create(variant: CreateVariantInput): Promise<Variant>;
  findByProduct(product: ObjectId): Promise<Variant[]>;
  findById(_id: string | ObjectId): Promise<Variant>;
  update(_id: string, data: any): Promise<Variant>;
}
