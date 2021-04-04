import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ListUserDTO } from '../../dtos/list-user.dto';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';
import { deleteFile } from '../../../../storage/delete';
import { uploadFile } from '../../../../config/upload';

@Injectable()
class UpdateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string, user: UpdateUserInput): Promise<ListUserDTO> {
    if (user.email) {
      const userAlreadyExists = await this.usersRepository.findByEmail(
        user.email,
      );

      if (
        userAlreadyExists &&
        ((userAlreadyExists as unknown) as ListUserDTO)._id != userId
      ) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
    }

    if (user.profile_picture) {
      const currentUser = await this.usersRepository.findById(userId);

      const picture = await user.profile_picture;

      const path = await uploadFile(picture, 'image', 'profile_pictures');

      if (currentUser.profile_picture) {
        await deleteFile(currentUser.profile_picture.filename);
      }

      (user as any).profile_picture = path;
    }

    const updatedUser = await this.usersRepository.update(userId, user);
    console.log('current', updatedUser);

    return (updatedUser as unknown) as ListUserDTO;
  }
}

export { UpdateUserService };
