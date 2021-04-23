import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-core';
import { FileUpload } from 'graphql-upload';

@InputType()
class UpdateProductVariantInput {
  @Field()
  _id: string;

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

  @Field(() => GraphQLUpload, { nullable: true })
  picture: FileUpload;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  category: string[];

  @Field({ nullable: true })
  brand: string;

  @Field(() => [UpdateProductVariantInput], { nullable: true })
  variants: UpdateProductVariantInput[];
}
