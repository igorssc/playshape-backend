import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
class ProfilePicture {
  @Field()
  url: string;
  @Field()
  filename: string;
}

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  profile_picture: ProfilePicture;

  @Field()
  isAdmin: boolean;

  @Field(() => [String])
  permissions: String[];

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
