import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';

import { User } from '../modules/accounts/entities/user.schema';
import { Actions } from '../enuns/actions.enum';

type Subjects = InferSubjects<typeof User> | 'User' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  listUsers(currentUser: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Actions, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    const permission = currentUser.permissions.some(
      (permission) => permission == Actions.ListUsers,
    );

    if (currentUser.isAdmin && permission) {
      can(Actions.ListUsers, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  updateUser(currentUser: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Actions, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    can(Actions.UpdateUser, User, { _id: currentUser._id });

    const permission = currentUser.permissions.some(
      (permission) => permission == Actions.UpdateUser,
    );

    if (currentUser.isAdmin && permission) {
      can(Actions.UpdateUser, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
