'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema('base');
    await queryInterface.createTable(
      'User',
      {
        id: {
          type: 'Int',
          primaryKey: true,
        },
      },
      { schema: 'base' },
    );

    await queryInterface.createSchema('transactional');
    await queryInterface.createTable(
      'Order',
      {
        id: {
          type: 'Int',
          primaryKey: true,
        },
        userId: {
          type: 'Int',
          references: {
            model: {
              tableName: 'User',
              schema: 'base',
            },
          },
        },
      },
      { schema: 'transactional' },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order', { schema: 'transactional' });
    await queryInterface.dropSchema('transactional');
    await queryInterface.dropTable('User', { schema: 'base' });
    await queryInterface.dropSchema('base');
  },
};
