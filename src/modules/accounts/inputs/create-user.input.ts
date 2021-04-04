import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

export { CreateUserInput };
