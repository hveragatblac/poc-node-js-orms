import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('SalesLT').table('Amalgamation', (table) => {
    table
      .specificType('createdAt', 'DateTime')
      .defaultTo(knex.raw('getdate()'));
    table.specificType('updateAt', 'DateTime').defaultTo(knex.raw('getdate()'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('SalesLT').table('Amalgamation', (table) => {
    table.dropColumns('createdAt', 'updateAt');
  });
}
