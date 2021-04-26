import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindProductTypeProduct {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  store: string;

  @Field({ nullable: true })
  category: string;
}

@InputType()
export class FindProductsInput {
  @Field(() => FindProductTypeProduct)
  product: FindProductTypeProduct;

  @Field({ defaultValue: 1, nullable: true })
  page: number;

  @Field({ defaultValue: 15, nullable: true })
  limit: number;
}
