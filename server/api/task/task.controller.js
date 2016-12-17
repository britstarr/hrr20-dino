const Promise = require('bluebird');
const Models = require('../../../database/database_config');


module.exports = {

  addATask: function (req, res, next) {
    Models.Task.create({
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
      RoutineId: req.body.RoutineId
    })
    .then(function(addedTask) {
      res.sendStatus(201);
    })
    .catch(function(error) {
      console.log("addATask error", error);
    });
  },

  //gets the routines for the specific user
  getAllTasks: function(req, res, next) {
    Models.Task.findAll(
    //   {
    //   where: {
    //     RoutineId: req.params.RoutineId
    //   }
    // }
  )
      .then(function (tasks) {
        res.json(tasks);
      })
      .catch(function(error) {
        next(error);
      });

  },

  deleteATask: function(req, res, next) {
    Models.Task.destroy({
      where: {
        id: req.params.taskId
      }
    })
    .then(function(result) {
      res.send('Task successfully removed!');
    })
    .catch(function(error) {
      next(error);
    })
  },

  updateATask: function(req, res, next) {
    Models.Task.update(req.body, {
      where: {
        id:  req.params.taskId
      },
      returning: true
    })
    .then(function(count, result) {
      res.json(result);
    })
    .catch(function(error) {
      next(error);
    })
  }


}
