const Promise = require('bluebird');
const Models = require('../../../database/database_config');

module.exports = {
  //Adds a user's routine to the Routine table
  addARoutine: function (req, res, next) {

    // console.log('inside addARoutine in routine.controller, req.body = ' + JSON.stringify(req.body, null, 2));

    Models.Routine.create({
      name: req.body.name,
      description: req.body.description,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      repeat: req.body.repeat,
      completed: req.body.completed
    })
    .then(function(){
      res.status(201).send('Successfully created routine!')
    })
    .catch(function(error){
      res.status(404).send(error);
    })
  },

  //Gets the routines for the current user
  getMyRoutines: function(req, res, next) {
    Models.Routine.findAll(
    //   {
    //   where: {
    //     userId: req.params.userId
    //   }
    // }
  )
    .then(function(routines){
      res.status(200).json(routines);
    })
    .catch(function(error) {
      res.send(error);
    });
  },

  //Gets a single routine for a user
  getARoutine: function(req, res, next) {
    Models.Routine.findAll({
      where: {
        id: req.params.routineId,
        userId: req.params.userId
      }
    })
    .then(function(routine){
      console.log("routine", routine);
      res.status(200).json(routine);
    })
    .catch(function(error) {
      res.send(error);
    });
  },

  //Deletes a user's routine from the Routine table
  deleteARoutine: function(req, res, next) {
    Models.Routine.destroy({
      where: {
        id: req.params.routineId,
        // userId: req.params.userId
      }
    })
    .then(function() {
      res.status(200).send('Routine successfully deleted!')
    })
    .catch(function(error){
      res.send(error);
    });
  },

  updateARoutine: function(req, res, next) {
    //Syntax for this might be tricky, as we have to dynamically
    //update a user-specified routine property.
  },
}
