import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

@InputType()
class UpdateUserInput {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => GraphQLUpload, { nullable: true })
  profile_picture: FileUpload;

  @Field({ defaultValue: new Date() })
  updated_at: Date;
}

export { UpdateUserInput };
