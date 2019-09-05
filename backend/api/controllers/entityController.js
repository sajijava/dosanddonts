'use strict';

const dbpool  = require('../models/db')

exports.allEntities = function(req, res) {
  dbpool.query('select * from entity limit 10',(error,result) => {
    if(error) throw error;

    res.json(result);
  });
};


exports.getEntity = function(req,res){
  dbpool.query('select * from entity where entity_uid = ?',req.params.id, (error,result) => {
    if(error) throw error;

    res.json(result);
  });
}

  exports.getEntityGeoRadius = function(req,res){
    dbpool.query('select distinct e.*  from entity e  join location l on e.entity_uid = l.entity_uid join ( SELECT location_uid, ( 3959 * acos ( cos ( radians(?) ) * cos( radians( LATITUDE ) ) * cos( radians( LONGITUDE ) - radians(?) ) + sin ( radians(?) ) * sin( radians( LATITUDE ) ) ) ) AS distance FROM geo_location HAVING distance < ? ORDER BY distance ) r on r.location_uid = l.location_uid',
    [req.params.lat,req.params.long,req.params.lat,req.params.distance], (error,result) => {
      if(error) throw error;

      res.json(result);
    });

}
