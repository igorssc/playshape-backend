import { ObjectType } from '@nestjs/graphql';

import { UserDTO } from './UserDTO';

@ObjectType()
class ListUserDTO extends UserDTO {}

export { ListUserDTO };
