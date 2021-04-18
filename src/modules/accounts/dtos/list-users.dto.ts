import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateDTO } from '../../../common/dtos/paginate.dto';
import { UserDTO } from './user.dto';

@ObjectType()
export class ListUsersDTO extends PaginateDTO {
  @Field(() => [UserDTO], { defaultValue: [] })
  users: UserDTO[];
}
