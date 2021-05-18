const { productController } = require('../controllers');
const asyncHandler = require('../helpers/asyncHandler');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/api/products', asyncHandler(productController.getProducts));
  app.get('/api/products/:id', asyncHandler(productController.getProductById));
};
