const errorHandler = require('../middlewares/error-handler');

module.exports = (app) => {
  app.use((err, req, res, next) => { errorHandler(err, res); });
};
