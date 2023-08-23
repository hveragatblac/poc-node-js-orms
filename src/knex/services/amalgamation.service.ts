import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class AmalgamationService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  async saveOne(dto: unknown) {
    return this.knex
      .withSchema('SalesLT')
      .returning('*')
      .insert(dto)
      .into('Amalgamation');
  }

  async saveMany(dtos: unknown[]) {
    return undefined;
  }

  async findFirst(criterion: unknown) {
    return undefined;
  }

  async findUnique(criterion: unknown) {
    return undefined;
  }

  async find(criterion: unknown) {
    return undefined;
  }

  async updateFirst(dto: unknown, criterion: unknown) {
    return undefined;
  }

  async updateMany(dto: unknown, criterion: unknown) {
    return undefined;
  }

  async deleteFirst(criterion: unknown) {
    return undefined;
  }

  async deleteMany(criterion: unknown) {
    return undefined;
  }
}
