import { Field, InputType } from '@nestjs/graphql';

@InputType()
class AuthenticateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

export { AuthenticateUserInput };
