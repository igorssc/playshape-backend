import { Field, InputType } from '@nestjs/graphql';
import { FindProductInput } from './find-product.input';

@InputType()
export class FindProductsRelatedInput extends FindProductInput {
  @Field({ defaultValue: 1, nullable: true })
  page: number;

  @Field({ defaultValue: 15, nullable: true })
  limit: number;
}
