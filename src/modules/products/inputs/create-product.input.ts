import { Field, InputType } from '@nestjs/graphql';
import { CreateVariantInput } from './create-variant.input';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field()
  store: string;

  @Field(() => [CreateVariantInput])
  variants: CreateVariantInput[];
}
