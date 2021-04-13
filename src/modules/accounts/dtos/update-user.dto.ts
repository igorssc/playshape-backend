import { ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
class UpdateUserDTO extends UserDTO {}

export { UpdateUserDTO };
