import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class CategoryDTO {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
