import {DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectLiteral, UpdateResult} from 'typeorm';

export interface IGenericRepository<E extends ObjectLiteral> {
  createOne(data: DeepPartial<E>): Promise<E>;
  createMany(data: DeepPartial<E>[]): Promise<E[]>;
  findOne(findOneOptions: FindOneOptions<E>): Promise<E | null>;
  findMany(findManyOptions: FindManyOptions<E>): Promise<E[]>;
  updateOne(findOptions: FindOptionsWhere<E>, data: Partial<E>): Promise<UpdateResult>;
  delete(findOptions: FindOptionsWhere<E>): Promise<void>;
}
