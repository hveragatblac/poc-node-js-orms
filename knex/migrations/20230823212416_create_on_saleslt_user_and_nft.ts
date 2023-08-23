import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('SalesLT').createTable('User', (table) => {
    table
      .specificType('id', 'UniqueIdentifier')
      .primary()
      .defaultTo(knex.raw('newid()'), { constraintName: 'DF_User_id' });
    table
      .specificType('name', 'NVarChar(255)')
      .unique({ indexName: 'AK_User_name' });
  });
  await knex.schema.withSchema('SalesLT').createTable('Nft', (table) => {
    table
      .specificType('id', 'UniqueIdentifier')
      .primary()
      .defaultTo(knex.raw('newid()'), { constraintName: 'DF_Nft_id' });
    table
      .specificType('url', 'NVarChar(510)')
      .unique({ indexName: 'AK_Nft_url' });
    table.specificType('userId', 'UniqueIdentifier');
    table.foreign('userId').references('id').inTable('SalesLT.User');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('SalesLT').dropTable('Nft');
  await knex.schema.withSchema('SalesLT').dropTable('User');
}
