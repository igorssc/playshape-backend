import { ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
class CreateUserDTO extends UserDTO {}

export { CreateUserDTO };
