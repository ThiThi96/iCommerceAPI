const bodyParser = require('body-parser');
const queryCompare = require('../middlewares/query-compare');
const errorHandler = require('../middlewares/error-handler');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(queryCompare);
};
