import {DeepPartial, EntityTarget, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository, UpdateResult} from 'typeorm';
import { IGenericRepository } from './IGenericRepository';
import { AppDataSource } from '../../Data/TypeORMConfig';

export class GenericRepository<E extends ObjectLiteral> implements IGenericRepository<E> {
  private repo: Repository<E>;

  constructor(EntityClass: EntityTarget<E>) {
    this.repo = AppDataSource.getRepository(EntityClass);
  }

  async createOne(data: DeepPartial<E>): Promise<E> {
    return this.repo.save(this.repo.create(data));
  }

  async createMany(data: DeepPartial<E>[]): Promise<E[]> {
    return this.repo.save(this.repo.create(data));
  }

  async findOne(findOneOptions: FindOneOptions<E>): Promise<E | null> {
    return this.repo.findOne(findOneOptions);
  }

  async findMany(findManyOptions: FindManyOptions<E>): Promise<E[]> {
    return this.repo.find(findManyOptions);
  }

  async updateOne(findOptions: FindOptionsWhere<E>, data: Partial<E>): Promise<UpdateResult> {
    return this.repo.update(findOptions, data);
  }

  async delete(findOptions: FindOptionsWhere<E>): Promise<void> {
    await this.repo.delete(findOptions);
  }
}
