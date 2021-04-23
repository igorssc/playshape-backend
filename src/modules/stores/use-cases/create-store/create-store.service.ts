import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateStoreDTO } from '../../dtos/create-store.dto';
import { CreateStoreInput } from '../../inputs/create-store.input';
import { StoresRepository } from '../../repositories/implementations/stores.repository';
import { CreateSlug } from '../../utils/create-slug';
import { VerifyDataLinkedToAUser } from '../../utils/verify-data-linked-to-a-user';

@Injectable()
export class CreateStoreService {
  constructor(
    private readonly storesRepository: StoresRepository,
    private readonly createSlug: CreateSlug,
    private readonly verifyDataLinkedToAUser: VerifyDataLinkedToAUser,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateStoreInput): Promise<CreateStoreDTO> {
    email = email.toLowerCase();

    await this.verifyDataLinkedToAUser.verifyEmail(email);

    const storeEmailAlreadyExists = await this.storesRepository.findByEmail(
      email,
    );

    if (storeEmailAlreadyExists) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const slug = await this.createSlug.create(name);

    const passwordHash = await hash(password, 8);

    const createdStore = await this.storesRepository.create({
      name,
      email,
      slug,
      password: passwordHash,
    });
    return createdStore;
  }
}
