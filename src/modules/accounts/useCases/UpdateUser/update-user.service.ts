import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import validarCpf from 'validar-cpf';
import { uploadFile } from '../../../../config/upload';
import { deleteFile } from '../../../../storage/delete';
import { UpdateUserDTO } from '../../dtos/update-user.dto';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { IUpdateUser } from '../../interfaces/IUpdate-user';
import { UsersRepository } from '../../repositories/implementations/users.repository';

@Injectable()
class UpdateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    userId: string,
    user: UpdateUserInput['user'],
  ): Promise<UpdateUserDTO> {
    if (user.cpf) {
      const cpfIsValid = validarCpf(user.cpf);

      if (!cpfIsValid) {
        throw new HttpException(
          'CPF informed with format invalid',
          HttpStatus.BAD_REQUEST,
        );
      }

      const userAlreadyExists = await this.usersRepository.findByCpf(user.cpf);

      if (userAlreadyExists && String(userAlreadyExists._id) != userId) {
        throw new HttpException('CPF already exists', HttpStatus.CONFLICT);
      }
    }

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

    Object.assign(user, { updated_at: new Date() });

    const updatedUser = await this.usersRepository.update(userId, user);

    return updatedUser;
  }
}

export { UpdateUserService };
