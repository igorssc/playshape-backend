import { ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
class FindUserDTO extends UserDTO {}

export { FindUserDTO };
