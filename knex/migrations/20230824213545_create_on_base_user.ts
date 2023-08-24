import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
IF (SCHEMA_ID(N'base') IS NULL)
BEGIN
  EXEC('CREATE SCHEMA [base] AUTHORIZATION [dbo]')
END
  `);
  await knex.schema.withSchema('base').createTable('User', (table) => {
    table.integer('id').primary();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('base').dropTable('User');
  await knex.schema.raw('DROP SCHEMA [base]');
}
