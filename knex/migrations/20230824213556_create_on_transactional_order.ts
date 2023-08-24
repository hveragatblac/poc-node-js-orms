import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
IF (SCHEMA_ID(N'transactional') IS NULL)
BEGIN
  EXEC('CREATE SCHEMA [transactional] AUTHORIZATION [dbo]')
END
  `);
  await knex.schema
    .withSchema('transactional')
    .createTable('Order', (table) => {
      table.integer('id').primary();
      table.integer('userId');
      table.foreign('userId').references('id').inTable('base.User');
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('transactional').dropTable('Order');
  await knex.schema.raw('DROP SCHEMA [transactional]');
}
