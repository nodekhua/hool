'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        // primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      productID: {
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      packing_unit: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      warranty: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.DECIMAL
      },
      pre_exchange: {
        type: Sequelize.INTEGER
      },
      date_price_change: {
        type: Sequelize.DATEONLY
      },
      price: {
        type: Sequelize.DECIMAL
      },
      original_number: {
        type: Sequelize.STRING,
        // primaryKey: true
        unique: true
      },
      type: {
        // ?? What about "Product" type? (see table)
        type: Sequelize.ENUM('Version', 'Accessory')
      },
      fullcover: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      main_product_name: {
        type: Sequelize.STRING,
        references: {
          model: 'main_products',
          key: 'name'
        }
      },
      // SCA???
      primary: {
        type: Sequelize.INTEGER
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('products')
  }
};
