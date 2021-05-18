const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Action, { foreignKey: 'actionId' });
    }
  }
  UserActivity.init({
    timestamp: DataTypes.DATE,
    actionId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    vistorId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserActivity',
  });
  return UserActivity;
};
