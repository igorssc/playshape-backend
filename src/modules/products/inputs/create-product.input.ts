import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateProductVariantInput {
  @Field()
  size: string;

  @Field()
  flavor: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  promotion: number;

  @Field()
  quantity: number;
}

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field()
  story: string;

  @Field(() => [CreateProductVariantInput])
  variants: CreateProductVariantInput[];
}
