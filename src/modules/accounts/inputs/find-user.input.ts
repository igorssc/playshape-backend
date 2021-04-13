import { Field, InputType } from '@nestjs/graphql';

@InputType()
class User {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  cpf: string;
}

@InputType()
class FindUserInput {
  @Field()
  token: string;

  @Field({ nullable: true })
  user: User;
}

export { FindUserInput };
