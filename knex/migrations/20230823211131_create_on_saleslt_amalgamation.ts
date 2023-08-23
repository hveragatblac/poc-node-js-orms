import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema('SalesLT')
    .createTable('Amalgamation', (table) => {
      table.increments('id', { primaryKey: true });
      table
        .specificType('name', 'VarChar(255)')
        .unique({ indexName: 'AK_Amalgamation_name' });
      table.specificType('fBigint', 'BigInt');
      table.specificType('fBit', 'Bit');
      table.specificType('fDecimal', 'Decimal(30, 10)');
      table.specificType('fInt', 'Int');
      table.specificType('fMoney', 'Money');
      table.specificType('fSmallint', 'SmallInt');
      table.specificType('fSmallmoney', 'SmallMoney');
      table.specificType('fTinyint', 'TinyInt');
      table.specificType('fFloat', 'Float(24)');
      table.specificType('fReal', 'Real');
      table.specificType('fDate', 'Date');
      table.specificType('fDatetime2', 'DateTime2');
      table.specificType('fDatetime', 'DateTime');
      table.specificType('fDatetimeoffset', 'DateTimeOffset');
      table.specificType('fSmalldatetime', 'SmallDateTime');
      table.specificType('fTime', 'Time');
      table.specificType('fChar', 'Char(255)');
      table.specificType('fVarchar', 'VarChar(255)');
      table.specificType('fText', 'Text');
      table.specificType('fNChar', 'NChar(255)');
      table.specificType('fNVarchar', 'NVarChar(255)');
      table.specificType('fNText', 'NText');
      table.specificType('fBinary', 'Binary(8)');
      table.specificType('fImage', 'Image');
      table.specificType('fVarbinary', 'VarBinary(8)');
      table.specificType('fUniqueidentifier', 'UniqueIdentifier');
      table.specificType('fXml', 'Xml');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema('SalesLT').dropTable('Amalgamation');
}
