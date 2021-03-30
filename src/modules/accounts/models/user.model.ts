import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: new Date() })
  created_at: Date;

  @Field({ defaultValue: new Date() })
  updated_at: Date;
}
