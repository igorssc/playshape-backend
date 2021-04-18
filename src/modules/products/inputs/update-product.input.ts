import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UpdateProductVariantInput {
  @Field({ nullable: true })
  size: string;

  @Field({ nullable: true })
  flavor: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  promotion: number;

  @Field({ nullable: true })
  quantity: number;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  category: string;

  @Field(() => [UpdateProductVariantInput], { nullable: true })
  variants: UpdateProductVariantInput[];
}
