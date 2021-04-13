import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
class FindUserAuthenticatedDTO {
  @Field()
  user: UserDTO;

  @Field()
  token: string;
}

export { FindUserAuthenticatedDTO };
