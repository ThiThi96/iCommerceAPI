const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Colour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Colour.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Colour',
  });
  return Colour;
};
