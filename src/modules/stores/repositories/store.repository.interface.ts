import { ObjectId, PaginateResult } from 'mongoose';
import { Store, StoreDocument } from '../entities/store.entity';
import { CreateStoreInput } from '../inputs/create-store.input';

export interface IStoreRepository {
  create(store: CreateStoreInput): Promise<Store>;
  findById(id: string): Promise<Store>;
  findByEmail(email: string): Promise<Store>;
  findByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginateResult<StoreDocument>>;
  findBySlug(slug: string): Promise<Store>;
  findByCpf(cpf: string): Promise<Store>;
  findByCnpj(cpf: string): Promise<Store>;
  listAllStores(
    page: number,
    limit: number,
  ): Promise<PaginateResult<StoreDocument>>;
  update(id: string | ObjectId, data: any): Promise<Store>;
}
