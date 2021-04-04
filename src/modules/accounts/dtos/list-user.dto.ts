import { ObjectType } from '@nestjs/graphql';

import { UserDTO } from './user.dto';

@ObjectType()
class ListUserDTO extends UserDTO {}

export { ListUserDTO };
