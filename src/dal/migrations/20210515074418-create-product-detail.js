module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Products',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      colourId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Colours',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductDetails');
  },
};
