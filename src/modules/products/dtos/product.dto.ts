import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { VariantDTO } from './variant.dto';

@ObjectType()
export class ProductDTO extends Product {
  @Field(() => [VariantDTO])
  variants: VariantDTO[];
}
