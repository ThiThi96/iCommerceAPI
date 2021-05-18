const productController = require('@/controllers/product-controller');
const productBusiness = require('@/bll/product-business');
const userActivityBusiness = require('@/bll/user-activity-business');
// const errorHelper = require('@/helpers/error');

// (Mock) First mock the module, list method to be mocked
jest.mock('@/bll/product-business', () => ({
  getProducts: jest.fn(),
  getProductsByKeyword: jest.fn(),
}));

jest.mock('@/bll/user-activity-business', () => ({
  addActivity: jest.fn(),
}));

// jest.mock('@/helpers/error', () => ({
//   CustomError: jest.fn(),
// }));

describe('ProductController', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('GetProducts', () => {
    it('should call productBusiness.getProducts & userActivityBusiness.addActivity correctly when skip, limit are provided', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          skip: 1,
          limit: 5,
        },
        originalUrl: '/api/test',
      };
      const res = {
        send: spy,
      };

      productBusiness.getProducts.mockImplementation(() => Promise.resolve([{ id: 1, name: 'sunny dress' }]));
      userActivityBusiness.addActivity.mockImplementation(() => Promise.resolve({ id: 1, actionId: 2 }));

      // act
      await productController.getProducts(req, res);

      // assert
      expect(productBusiness.getProducts).toHaveBeenCalledWith(1, 5, undefined, undefined);
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(null, '/api/test', 'list');
      expect(res.send).toHaveBeenCalledWith([{ id: 1, name: 'sunny dress' }]);
    });
    it('should call productBusiness.getProducts(with default number of products) & userActivityBusiness.addActivity correctly when only skip is provided', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          skip: 1,
        },
        originalUrl: '/api/test',
      };
      const res = {
        send: spy,
      };

      productBusiness.getProducts.mockImplementation(() => Promise.resolve([{ id: 1, name: 'sunny dress' }]));
      userActivityBusiness.addActivity.mockImplementation(() => Promise.resolve({ id: 1, actionId: 2 }));

      // act
      await productController.getProducts(req, res);

      // assert
      expect(productBusiness.getProducts).toHaveBeenCalledWith(1, process.env.ITEMS_PER_PAGE, undefined, undefined);
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(null, '/api/test', 'list');
      expect(res.send).toHaveBeenCalledWith([{ id: 1, name: 'sunny dress' }]);
    });
    it('should call productBusiness.getProducts(at default page) & userActivityBusiness.addActivity correctly when limit is specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          limit: 5,
        },
        originalUrl: '/api/test',
      };
      const res = {
        send: spy,
      };

      productBusiness.getProducts.mockImplementation(() => Promise.resolve([{ id: 1, name: 'sunny dress' }]));
      userActivityBusiness.addActivity.mockImplementation(() => Promise.resolve({ id: 1, actionId: 2 }));

      // act
      await productController.getProducts(req, res);

      // assert
      expect(productBusiness.getProducts).toHaveBeenCalledWith(process.env.DEFAULT_START_POSITION, 5, undefined, undefined);
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(null, '/api/test', 'list');
      expect(res.send).toHaveBeenCalledWith([{ id: 1, name: 'sunny dress' }]);
    });
    it('should call productBusiness.getProducts correctly & userActivityBusiness.addActivity twice when skip, limit, orderBy, isDesc are valid', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          limit: 5,
          skip: 1,
          orderBy: 'price',
          isDesc: 'true',
        },
        originalUrl: '/api/test',
      };
      const res = {
        send: spy,
      };

      productBusiness.getProducts.mockImplementation(() => Promise.resolve([{ id: 1, name: 'sunny dress' }]));
      userActivityBusiness.addActivity.mockImplementation(() => Promise.resolve({ id: 1, actionId: 2 }));

      // act
      await productController.getProducts(req, res);

      // assert
      expect(productBusiness.getProducts).toHaveBeenCalledWith(1, 5, 'price', 'true');
      expect(userActivityBusiness.addActivity).toHaveBeenCalledTimes(2);
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(null, '/api/test', 'sort');
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(null, '/api/test', 'list');
      expect(res.send).toHaveBeenCalledWith([{ id: 1, name: 'sunny dress' }]);
    });
    // it('should throw error when orderBy and isDesc are provided but isDesc is not true/false', async () => {
    //   // arrange
    //   const spy = jest.fn();
    //   const req = {
    //     query: {
    //       limit: 5,
    //       skip: 1,
    //       orderBy: 'price',
    //       isDesc: '1',
    //     },
    //     originalUrl: '/api/test',
    //   };
    //   const res = {
    //     send: spy,
    //   };

    //   productBusiness.getProducts.mockImplementation(() => Promise.resolve([{ id: 1, name: 'sunny dress' }]));
    //   userActivityBusiness.addActivity.mockImplementation(() => Promise.resolve({ id: 1, actionId: 2 }));

    //   // act
    //   await productController.getProducts(req, res);

    //   // assert
    //   // expect(errorHelper.CustomError).toHaveBeenCalledWith('400', 'isDesc must be "true" or "false"');
    //   expect(productController.getProducts).toThrowError('isDesc must be "true" or "false"');
    // });
    it('should call productBusiness.getProducts & userActivityBusiness.addActivity correctly when skip, limit, visitorId are provided', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          skip: 1,
          limit: 5,
          visitorId: 1234,
        },
        originalUrl: '/api/test',
      };
      const res = {
        send: spy,
      };

      productBusiness.getProducts.mockImplementation(() => Promise.resolve([{ id: 1, name: 'sunny dress' }]));
      userActivityBusiness.addActivity.mockImplementation(() => Promise.resolve({ id: 1, actionId: 2 }));

      // act
      await productController.getProducts(req, res);

      // assert
      expect(productBusiness.getProducts).toHaveBeenCalledWith(1, 5, undefined, undefined);
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(1234, '/api/test', 'list');
      expect(res.send).toHaveBeenCalledWith([{ id: 1, name: 'sunny dress' }]);
    });
    it('should call productBusiness.getProductsByKeyword & userActivityBusiness.addActivity correctly when keyword, skip, limit, visitorId are provided', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          skip: 1,
          limit: 5,
          visitorId: 1234,
          keyword: 'test',
        },
        originalUrl: '/api/test',
      };
      const res = {
        send: spy,
      };

      productBusiness.getProductsByKeyword.mockImplementation(() => Promise.resolve([{ id: 1, name: 'sunny dress' }]));
      userActivityBusiness.addActivity.mockImplementation(() => Promise.resolve({ id: 1, actionId: 2 }));

      // act
      await productController.getProducts(req, res);

      // assert
      expect(productBusiness.getProductsByKeyword).toHaveBeenCalledWith('test', 1, 5, undefined, undefined);
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(1234, '/api/test', 'search');
      expect(res.send).toHaveBeenCalledWith([{ id: 1, name: 'sunny dress' }]);
    });
    it('should call productBusiness.getProductsByKeyword correctly & userActivityBusiness.addActivity twice when skip, limit, orderBy, isDesc are valid', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          limit: 5,
          skip: 1,
          orderBy: 'price',
          isDesc: 'true',
          keyword: 'test',
        },
        originalUrl: '/api/test',
      };
      const res = {
        send: spy,
      };

      productBusiness.getProductsByKeyword.mockImplementation(() => Promise.resolve([{ id: 1, name: 'sunny dress' }]));
      userActivityBusiness.addActivity.mockImplementation(() => Promise.resolve({ id: 1, actionId: 2 }));

      // act
      await productController.getProducts(req, res);

      // assert
      expect(productBusiness.getProductsByKeyword).toHaveBeenCalledWith('test', 1, 5, 'price', 'true');
      expect(userActivityBusiness.addActivity).toHaveBeenCalledTimes(2);
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(null, '/api/test', 'sort');
      expect(userActivityBusiness.addActivity).toHaveBeenCalledWith(null, '/api/test', 'search');
      expect(res.send).toHaveBeenCalledWith([{ id: 1, name: 'sunny dress' }]);
    });
  });

  //   describe('GetProductById', () => {

  //   });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
