import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
