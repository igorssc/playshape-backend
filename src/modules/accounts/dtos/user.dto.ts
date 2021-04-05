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
class Address {
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

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  cpf: string;

  @Field(() => [Address], { nullable: true })
  address: Address[];

  @Field({ nullable: true })
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
