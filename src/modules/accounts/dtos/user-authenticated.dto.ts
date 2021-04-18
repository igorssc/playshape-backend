import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class UserAuthenticatedDTO {
  @Field()
  user: UserDTO;

  @Field()
  token: string;
}
