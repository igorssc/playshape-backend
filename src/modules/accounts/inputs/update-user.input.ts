import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

@InputType()
class UpdateUserInputTypeAddress {
  @Field({ nullable: true })
  street: string;
  @Field({ nullable: true })
  number: number;
  @Field({ nullable: true })
  neighborhood: string;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  state: string;
  @Field({ nullable: true })
  zipCode: string;
}
@InputType()
class UpdateUserInputTypeUser {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  cpf: string;

  @Field(() => [UpdateUserInputTypeAddress], { nullable: true })
  address: UpdateUserInputTypeAddress[];

  @Field(() => GraphQLUpload, { nullable: true })
  profile_picture: FileUpload;

  @Field({ nullable: true })
  password: string;

  @Field({ defaultValue: new Date() })
  updated_at: Date;
}

@InputType()
class UpdateUserInput {
  @Field()
  token: string;

  @Field()
  user: UpdateUserInputTypeUser;
}

export { UpdateUserInput, UpdateUserInputTypeUser };
