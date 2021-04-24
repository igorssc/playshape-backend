import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddressInput {
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

  @Field({ nullable: true })
  lat: string;

  @Field({ nullable: true })
  lng: string;
}
