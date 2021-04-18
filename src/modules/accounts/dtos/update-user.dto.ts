import { ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class UpdateUserDTO extends UserDTO {}
