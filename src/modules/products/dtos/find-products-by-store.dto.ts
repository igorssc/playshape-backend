import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateDTO } from '../../../common/dtos/paginate.dto';
import { ProductDTO } from './product.dto';

@ObjectType()
export class FindProductsByStoreDTO extends PaginateDTO {
  @Field(() => [ProductDTO], { defaultValue: [] })
  products: ProductDTO[];
}
