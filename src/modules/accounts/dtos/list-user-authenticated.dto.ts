import { Field, ObjectType } from '@nestjs/graphql';

import { UserDTO } from './user.dto';

@ObjectType()
class ListUserAuthenticatedDTO {
  @Field()
  user: UserDTO;

  @Field()
  token: string;
}

export { ListUserAuthenticatedDTO };
