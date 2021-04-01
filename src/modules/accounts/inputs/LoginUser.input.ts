import { Field, InputType } from '@nestjs/graphql';

@InputType()
class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

export { LoginUserInput };
