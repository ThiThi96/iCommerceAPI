const bodyParser = require('body-parser');
const queryCompare = require('../middlewares/query-compare');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(queryCompare);
};
