import { ObjectType } from '@nestjs/graphql';
import { UserDTO } from './user.dto';

@ObjectType()
export class FindUserDTO extends UserDTO {}
