import { Field, ObjectType } from '@nestjs/graphql';

import { UserDTO } from './UserDTO';

@ObjectType()
class ListUserAuthenticatedDTO {
  @Field()
  user: UserDTO;

  @Field()
  token: string;
}

export { ListUserAuthenticatedDTO };
