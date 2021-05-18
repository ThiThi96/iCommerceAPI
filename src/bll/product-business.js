const db = require('../dal/models');

const productBusiness = {
  async getProductsByKeyword(keyword, skip, limit, orderBy, isDesc) {
    if (!keyword) { return null; }
    return db.Product
      .findAll({
        where: {
          [db.Sequelize.Op.or]: [
            {
              name: {
                [db.Sequelize.Op.like]: `%${keyword}%`,
              },
            },
            {
              '$Brand.name$': {
                [db.Sequelize.Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
        include: {
          model: db.Brand,
          as: 'brand',
        },
        limit: limit >= 0 ? limit : process.env.ITEMS_PER_PAGE,
        offset: skip >= 0 ? skip : process.env.DEFAULT_START_POSITION,
        order: [[orderBy || 'name', isDesc ? 'DESC' : 'ASC']],
      }).then((data) => {
        const products = data.map((x) => x.get());
        return products;
      });
  },
  async getProducts(skip, limit, orderBy, isDesc) {
    return db.Product
      .findAll({
        include: {
          model: db.Brand,
          as: 'brand',
        },
        limit: limit >= 0 ? limit : process.env.ITEMS_PER_PAGE,
        offset: skip >= 0 ? skip : process.env.DEFAULT_START_POSITION,
        order: [[orderBy || 'name', isDesc ? 'DESC' : 'ASC']],
      }).then((data) => {
        const products = data.map((x) => x.get());
        return products;
      });
  },
  async getProductById(id) {
    if (!id) return null;
    const getProduct = db.Product
      .findOne({
        where: {
          id,
        },
        include: [
          {
            model: db.Brand,
            as: 'brand',
          },
        ],
      });
    const getProductDetails = db.ProductDetail
      .findAll({
        attributes: ['id', 'productId'],
        include: {
          model: db.Colour,
        },
        where: {
          productId: id,
        },
      });
    return Promise.all([getProduct, getProductDetails])
      .then((data) => {
        if (!data[0]) return null;
        const product = data[0].get();
        const details = data[1].map((x) => x.get());
        return { ...product, details };
      });
  },
};

module.exports = productBusiness;
