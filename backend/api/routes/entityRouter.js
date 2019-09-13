'use strict';

module.exports = (app,db) => {
  var entityController = require('../controllers/entityController');
  var authController = require('../controllers/authController');

  // todoList Routes
  app.route('/api/entities').get(entityController.allEntities);

  app.route('/api/entity/:id').get(entityController.getEntity);

  app.route('/api/aroundme/:lat/:long/:distance').get(entityController.getEntityGeoRadius);

  app.route('/api/dailynotifications').get(entityController.dailyNotifications);

  app.route('/api/auth/login').post(authController.login);
  app.route('/api/auth/register').post(authController.register);
  app.route('/api/auth/logout').get(authController.logout);
  app.route('/api/auth/user').get(authController.getUser);

};
