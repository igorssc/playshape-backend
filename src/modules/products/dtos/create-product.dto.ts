import { ObjectType } from '@nestjs/graphql';
import { ProductDTO } from './product.dto';

@ObjectType()
export class CreateProductDTO extends ProductDTO {}
