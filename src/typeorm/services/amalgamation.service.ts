import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Amalgamation } from '../models/amalgamation.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AmalgamationService {
  constructor(
    @InjectRepository(Amalgamation)
    private readonly amalgamationRepository: Repository<Amalgamation>,
  ) {}

  async saveOne(dto: DeepPartial<Amalgamation>) {
    return this.amalgamationRepository.save(dto);
  }

  async saveMany(dtos: DeepPartial<Amalgamation>[]) {
    // TODO: How can I cleanly bypass the parameters limit? raw queries allow it but using the Knex API?
    const maxSqlServerParams = 2000;
    const dtoFieldCount = Object.keys(dtos[0]).length;
    const batchSize = Math.floor(maxSqlServerParams / dtoFieldCount);
    return this.amalgamationRepository.save(dtos, { chunk: batchSize });
  }

  async findFirst(criterion: FindOptionsWhere<Amalgamation>) {
    return this.amalgamationRepository.findOneBy(criterion);
  }

  async findUnique(criterion: FindOptionsWhere<Amalgamation>) {
    return this.amalgamationRepository.findOneBy(criterion);
  }

  async find(criterion: FindOptionsWhere<Amalgamation>) {
    return this.amalgamationRepository.findBy(criterion);
  }

  // TODO: Should try to use repository.update
  async updateFirst(dto: DeepPartial<Amalgamation>) {
    return this.amalgamationRepository.save(dto);
  }

  // TODO: Should try to use repository.update
  async updateMany(dtos: DeepPartial<Amalgamation>[]) {
    // TODO: How can I cleanly bypass the parameters limit? raw queries allow it but using the Knex API?
    const maxSqlServerParams = 2000;
    const dtoFieldCount = Object.keys(dtos[0]).length;
    const batchSize = Math.floor(maxSqlServerParams / dtoFieldCount);
    return this.amalgamationRepository.save(dtos, { chunk: batchSize });
  }

  async deleteFirst(dto: DeepPartial<Amalgamation>) {
    return this.amalgamationRepository.remove(dto as Amalgamation);
  }

  async deleteMany(dtos?: DeepPartial<Amalgamation>[]) {
    if (!dtos || dtos.length === 0) {
      return this.amalgamationRepository.createQueryBuilder().delete();
    }
    return this.amalgamationRepository.remove(dtos as Amalgamation[]);
  }
}
