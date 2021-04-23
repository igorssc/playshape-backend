import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaType } from '@nestjs/mongoose';

@SchemaType()
@ObjectType()
export class Picture {
  @Prop()
  @Field()
  url: string;
  @Prop()
  @Field()
  filename: string;
}
