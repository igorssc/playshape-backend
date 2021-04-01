import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UpdateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ defaultValue: new Date() })
  updated_at: Date;
}

export { UpdateUserInput };
