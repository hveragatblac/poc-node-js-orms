import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .withSchema('SalesLT')
    .alterTable('Amalgamation', (table) => {
      table.dropUnique(['name'], 'AK_Amalgamation_name');
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .withSchema('SalesLT')
    .alterTable('Amalgamation', (table) => {
      table.unique(['name'], { indexName: 'AK_Amalgamation_name' });
    });
}
