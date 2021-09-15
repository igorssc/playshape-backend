import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindStoreInput {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  cnpj: string;

  @Field({ nullable: true })
  slug: string;
}
