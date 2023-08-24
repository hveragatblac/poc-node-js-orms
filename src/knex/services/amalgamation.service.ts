import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Connections } from '../enums/connections.enum';

@Injectable()
export class AmalgamationService {
  constructor(
    @InjectKnex(Connections.AdventureWorksLT2019_Knex)
    private readonly knex: Knex,
  ) {}

  async saveOne(dto: unknown) {
    return this.knex
      .withSchema('SalesLT')
      .insert(dto)
      .into('Amalgamation')
      .returning('*');
  }

  async saveMany(dtos: unknown[]) {
    // TODO: How can I cleanly bypass the parameters limit? raw queries allow it but using the Knex API?
    const maxSqlServerParams = 2000;
    const dtoFieldCount = Object.keys(dtos[0]).length;
    const batchSize = Math.floor(maxSqlServerParams / dtoFieldCount);
    return this.knex
      .batchInsert('SalesLT.Amalgamation', dtos, batchSize)
      .returning('*');
  }

  async findFirst(criterion: unknown) {
    return this.knex
      .withSchema('SalesLT')
      .select('*')
      .from('Amalgamation')
      .where(criterion)
      .first();
  }

  // TODO: Is there a way I could enforce uniqueness using types like Prisma?
  async findUnique(criterion: unknown) {
    return this.knex
      .withSchema('SalesLT')
      .select('*')
      .from('Amalgamation')
      .where(criterion)
      .first();
  }

  async find(criterion: unknown) {
    return this.knex
      .withSchema('SalesLT')
      .select('*')
      .from('Amalgamation')
      .where(criterion);
  }

  async updateFirst(dto: unknown, criterion: unknown) {
    return this.knex
      .withSchema('SalesLT')
      .from('Amalgamation')
      .update(dto)
      .where(criterion)
      .limit(1)
      .returning('*')
      .then((rows) => (rows.length === 0 ? undefined : rows[0]));
  }

  async updateMany(dto: unknown, criterion: unknown) {
    return this.knex
      .withSchema('SalesLT')
      .from('Amalgamation')
      .update(dto)
      .where(criterion)
      .returning('*');
  }

  // TODO: .limit doesn't work with deletes
  async deleteFirst(criterion: unknown) {
    const fromCriterion = this.knex.withSchema('SalesLT').from('Amalgamation');
    const id = await fromCriterion
      .clone()
      .select('id')
      .where(criterion)
      .first();
    return fromCriterion
      .clone()
      .delete()
      .where(id)
      .returning('*')
      .then((rows) => (rows.length === 0 ? undefined : rows[0]));
  }

  async deleteMany(criterion: unknown) {
    return this.knex
      .withSchema('SalesLT')
      .from('Amalgamation')
      .delete()
      .where(criterion)
      .returning('*');
  }
}
