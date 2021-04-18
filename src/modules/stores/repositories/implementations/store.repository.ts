import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, PaginateModel, PaginateResult } from 'mongoose';
import { Store, StoreDocument } from '../../entities/store.entity';
import { CreateStoreInput } from '../../inputs/create-store.input';
import { IStoreRepository } from '../store.repository.interface';

interface createStoreProps extends CreateStoreInput {
  slug: string;
}

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectModel(Store.name)
    private storeModel: Model<StoreDocument>,
  ) {}

  async create(store: createStoreProps): Promise<Store> {
    const newStore = new Store();

    Object.assign(newStore, store);

    const repository = new this.storeModel(newStore);

    return await repository.save();
  }

  async findById(_id: string): Promise<Store> {
    const store = await this.storeModel.findOne({ _id });

    return store;
  }

  async findByEmail(email: string): Promise<Store> {
    const store = await this.storeModel.findOne({ email });

    return store;
  }

  async findBySlug(slug: string): Promise<Store> {
    const store = await this.storeModel.findOne({
      slug,
    });

    return store;
  }

  async findByCpf(cpf: string): Promise<Store> {
    const store = await this.storeModel.findOne({
      cpf,
    });

    return store;
  }

  async findByCnpj(cnpj: string): Promise<Store> {
    const store = await this.storeModel.findOne({
      cnpj,
    });

    return store;
  }

  async findByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginateResult<StoreDocument>> {
    const stores = await (this
      .storeModel as PaginateModel<StoreDocument>).paginate(
      { name: { $regex: name, $options: 'i' } },
      { page, limit },
    );

    return stores;
  }

  async listAllStores(
    page: number,
    limit: number,
  ): Promise<PaginateResult<StoreDocument>> {
    const stores = await (this
      .storeModel as PaginateModel<StoreDocument>).paginate(
      {},
      { page, limit },
    );

    return stores;
  }

  async update(id: string | ObjectId, data: any): Promise<Store> {
    const user = await this.storeModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    return user;
  }
}
