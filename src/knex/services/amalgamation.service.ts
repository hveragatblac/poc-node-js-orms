import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { inspect } from 'node:util';

@Injectable()
export class AmalgamationService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  async saveOne(dto: unknown) {
    const insert = this.knex
      .withSchema('SalesLT')
      .returning('*')
      .insert(dto)
      .into('Amalgamation');
    console.log(inspect(insert.toSQL().toNative()));
    console.log(inspect(insert.toQuery()));
    return insert;
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
