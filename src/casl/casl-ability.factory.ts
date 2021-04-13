import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ActionsUser } from '../enuns/actions-user.enum';
import { User } from '../modules/accounts/entities/user.schema';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[ActionsUser, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  checkPermission(currentUser: User, permissionType: ActionsUser) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[ActionsUser, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    can(permissionType, User, { _id: currentUser._id });

    console.log(
      JSON.stringify(can(permissionType, User, { _id: currentUser._id })),
    );

    try {
      const permission = currentUser?.permissions.some(
        (permission) => permission == String(permissionType),
      );

      console.log(currentUser._id);

      if (currentUser.isAdmin && permission) {
        can(permissionType, 'all');
      }
    } catch (err) {
      console.log(err);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
