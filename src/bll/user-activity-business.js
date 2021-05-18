const db = require('../dal/models');

const userActivityBusiness = {
  async addActivity(visitorId, url, actionName) {
    if (actionName && url) {
      const [action] = await db.Action.findOrCreate({ where: { name: actionName } });
      return db.UserActivity.create({
        visitorId, url, actionId: action.id, timestamp: db.Sequelize.fn('NOW'),
      }).then((data) => data.get());
    }
    return null;
  },
};

module.exports = userActivityBusiness;
