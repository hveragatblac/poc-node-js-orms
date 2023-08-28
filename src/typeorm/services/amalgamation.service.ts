import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
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

  async saveMany() {}

  async findFirst() {}

  async findUnique() {}

  async find() {}

  async updateFirst() {}

  async updateMany() {}

  async deleteFirst() {}

  async deleteMany(criterion: FindOptionsWhere<Amalgamation>) {
    return this.amalgamationRepository.delete(criterion);
  }
}
