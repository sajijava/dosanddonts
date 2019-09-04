'use strict';

module.exports = (app,db) => {
  var entityController = require('../controllers/entityController');

  // todoList Routes
  app.route('/api/entities').get(entityController.allEntities);

  app.route('/api/entity/:id').get(entityController.getEntity);

  app.route('/api/entity/:lat/:long/:distance').get(entityController.getEntityGeoRadius);

};
