import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { cpf as validarCpf } from 'cpf-cnpj-validator';
import { uploadFile } from '../../../../config/upload';
import { deleteFile } from '../../../../storage/delete';
import { UpdateUserDTO } from '../../dtos/update-user.dto';
import { UpdateUserInput } from '../../inputs/update-user.input';
import { UsersRepository } from '../../repositories/implementations/users.repository';
import { VerifyDataLinkedToAStore } from '../../utils/verify-email-linked-to-a-store';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly verifyDataLinkedToAStore: VerifyDataLinkedToAStore,
  ) {}

  async execute(userId: string, user: UpdateUserInput): Promise<UpdateUserDTO> {
    if (user.cpf) {
      const cpfIsValid = validarCpf.isValid(user.cpf);

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

      await this.verifyDataLinkedToAStore.verifyCPF(user.cpf);
    }

    if (user._id) {
      const userExists = await this.usersRepository.findById(user._id);

      if (!userExists) {
        throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
      }

      delete user._id;
    }

    if (user.email) {
      user.email = user.email.toLowerCase();

      const userAlreadyExists = await this.usersRepository.findByEmail(
        user.email,
      );

      if (userAlreadyExists && String(userAlreadyExists._id) != userId) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      await this.verifyDataLinkedToAStore.verifyEmail(user.email);
    }

    if (user.profile_picture) {
      const currentUser = await this.usersRepository.findById(userId);

      const picture = await user.profile_picture;

      const path = await uploadFile(picture, 'image', 'profile_pictures');
      if (currentUser['profile_picture']) {
        await deleteFile(currentUser.profile_picture.filename);
      }

      Object.assign(user, { profile_picture: path });
    }

    if (user.password) {
      const passwordHash = await hash(user.password, 8);

      Object.assign(user, { password: passwordHash });
    }

    Object.assign(user, { updated_at: new Date() });

    const updatedUser = await this.usersRepository.update(userId, user);

    return updatedUser;
  }
}
