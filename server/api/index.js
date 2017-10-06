const Resources = require('../../app/constants/resources').default;
const api = {
  root: require('./root')
};

module.exports = (app) => {
  /**
   * Test
   */
  app.post(Resources.api.test, (req, res) => {
    api.root.post.test(req, res, app.get('superSecret'));
  });
};