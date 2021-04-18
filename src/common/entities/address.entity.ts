import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaType } from '@nestjs/mongoose';

@SchemaType()
@ObjectType()
export class Address {
  @Prop()
  @Field({ nullable: true })
  street: string;
  @Prop()
  @Field({ nullable: true })
  number: number;
  @Prop()
  @Field({ nullable: true })
  neighborhood: string;
  @Prop()
  @Field({ nullable: true })
  city: string;
  @Prop()
  @Field({ nullable: true })
  state: string;
  @Prop()
  @Field({ nullable: true })
  zipCode: string;
}
