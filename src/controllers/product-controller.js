const { productBusiness, userActivityBusiness } = require('../bll');
const { CustomError } = require('../helpers/error');

module.exports = {
  async getProducts(req, res) {
    const {
      keyword, orderBy, isDesc, visitorId,
    } = req.query;

    const skip = req.query.skip ? parseInt(req.query.skip, 10) : process.env.DEFAULT_START_POSITION;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : process.env.ITEMS_PER_PAGE;

    if (orderBy) {
      if (isDesc && isDesc.toLowerCase() !== 'true' && isDesc.toLowerCase() !== 'false') {
        throw new CustomError('400', 'isDesc must be "true" or "false"');
      }
      await userActivityBusiness.addActivity(visitorId || null, req.originalUrl, 'sort');
    }

    if (keyword) {
      await userActivityBusiness.addActivity(visitorId || null, req.originalUrl, 'search');
      const products = await productBusiness.getProductsByKeyword(keyword, skip, limit, orderBy, isDesc);
      return res.send(products);
    }
    await userActivityBusiness.addActivity(visitorId || null, req.originalUrl, 'list');
    const products = await productBusiness.getProducts(skip, limit, orderBy, isDesc);
    return res.send(products);
  },
  async getProductById(req, res) {
    const { id } = req.params;
    const { visitorId } = req.query;
    await userActivityBusiness.addActivity(visitorId || null, req.originalUrl, 'view product detail');
    const result = await productBusiness.getProductById(id);
    return res.send(result);
  },
};
