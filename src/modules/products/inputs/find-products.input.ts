import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindProductTypeStore {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  slug: string;
}

@InputType()
export class FindProductTypeCategory {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  slug: string;
}

@InputType()
export class FindProductTypeProduct {
  @Field({ nullable: true })
  name: string;

  @Field(() => FindProductTypeStore, { nullable: true })
  store: FindProductTypeStore;

  @Field(() => FindProductTypeCategory, { nullable: true })
  category: FindProductTypeCategory;
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
