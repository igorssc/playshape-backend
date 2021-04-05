import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ListUserDTO } from '../../dtos/list-user.dto';
import { UsersRepository } from '../../repositories/implementations/users.repository';
import { deleteFile } from '../../../../storage/delete';
import { uploadFile } from '../../../../config/upload';
import { UpdateUserInputTypeUser } from '../../inputs/update-user.input';
import { IUpdateUser } from '../../interfaces/IUpdate-user';

@Injectable()
class UpdateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    userId: string,
    user: UpdateUserInputTypeUser,
  ): Promise<ListUserDTO> {
    if (user._id) {
      const userExists = await this.usersRepository.findById(user._id);

      if (!userExists) {
        throw new HttpException('User does not exists', HttpStatus.BAD_REQUEST);
      }

      delete user._id;
    }

    if (user.email) {
      const userAlreadyExists = await this.usersRepository.findByEmail(
        user.email,
      );

      if (userAlreadyExists && String(userAlreadyExists._id) != userId) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
    }

    if (user.profile_picture) {
      const currentUser = await this.usersRepository.findById(userId);

      const picture = await user.profile_picture;

      const path = await uploadFile(picture, 'image', 'profile_pictures');
      if (currentUser['profile_picture']) {
        await deleteFile(currentUser.profile_picture.filename);
      }

      (user as IUpdateUser).profile_picture = path;
    }

    const updatedUser = await this.usersRepository.update(userId, user);

    return updatedUser as ListUserDTO;
  }
}

export { UpdateUserService };
