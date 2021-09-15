import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { AddressInput } from '../../../common/inputs/address.input';

@InputType()
export class UpdateStoreInput {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  slug: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  cnpj: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => AddressInput, { nullable: true })
  address: AddressInput;

  @Field(() => GraphQLUpload, { nullable: true })
  profile_picture: FileUpload;
}
