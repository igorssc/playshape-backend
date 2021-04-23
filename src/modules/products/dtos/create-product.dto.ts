import { Field, ObjectType } from '@nestjs/graphql';
import { ProductDTO } from './product.dto';

@ObjectType()
export default class CreateProductDTO {
  @Field(() => ProductDTO)
  product: ProductDTO;
}
