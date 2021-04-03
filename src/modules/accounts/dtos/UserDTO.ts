import { Field, ID, ObjectType } from '@nestjs/graphql';

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
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  profile_picture: ProfilePicture;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
