import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-core';
import { FileUpload } from 'graphql-upload';

@InputType()
export class CreateVariantInput {
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

  @Field({ nullable: true })
  product: string;

  @Field(() => GraphQLUpload)
  picture: FileUpload;
}
