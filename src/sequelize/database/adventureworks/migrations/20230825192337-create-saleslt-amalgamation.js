'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Amalgamation',
      {
        id: {
          type: 'Int',
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: 'VarChar(255)',
        },
        fBigint: {
          type: 'BigInt',
        },
        fBit: {
          type: 'Bit',
        },
        fDecimal: {
          type: 'Decimal(30, 10)',
        },
        fInt: {
          type: 'Int',
        },
        fMoney: {
          type: 'Money',
        },
        fSmallint: {
          type: 'SmallInt',
        },
        fSmallmoney: {
          type: 'SmallMoney',
        },
        fTinyint: {
          type: 'TinyInt',
        },
        fFloat: {
          type: 'Float(24)',
        },
        fReal: {
          type: 'Real',
        },
        fDate: {
          type: 'Date',
        },
        fDatetime2: {
          type: 'DateTime2',
        },
        fDatetime: {
          type: 'DateTime',
        },
        fDatetimeoffset: {
          type: 'DateTimeOffset',
        },
        fSmalldatetime: {
          type: 'SmallDateTime',
        },
        fTime: {
          type: 'Time',
        },
        fChar: {
          type: 'Char(255)',
        },
        fVarchar: {
          type: 'VarChar(255)',
        },
        fText: {
          type: 'Text',
        },
        fNChar: {
          type: 'NChar(255)',
        },
        fNVarchar: {
          type: 'NVarChar(255)',
        },
        fNText: {
          type: 'NText',
        },
        fBinary: {
          type: 'Binary(8)',
        },
        fImage: {
          type: 'Image',
        },
        fVarbinary: {
          type: 'VarBinary(8)',
        },
        fUniqueidentifier: {
          type: 'UniqueIdentifier',
        },
        fXml: {
          type: 'Xml',
        },
      },
      { schema: 'SalesLT' },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Amalgamation', { schema: 'SalesLT' });
  },
};
