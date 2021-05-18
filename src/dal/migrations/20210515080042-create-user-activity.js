module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserActivities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      timestamp: {
        type: Sequelize.DATE,
      },
      actionId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Actions',
        },
      },
      url: {
        type: Sequelize.STRING,
      },
      visitorId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('UserActivities');
  },
};
