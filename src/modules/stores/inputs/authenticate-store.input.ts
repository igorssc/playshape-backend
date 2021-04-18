import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthenticateStoreInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
