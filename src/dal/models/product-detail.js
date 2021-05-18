const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'productId' });
      this.belongsTo(models.Colour, { foreignKey: 'colourId' });
    }
  }
  ProductDetail.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    colourId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ProductDetail',
  });
  return ProductDetail;
};
