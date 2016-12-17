'use strict';

const path = require('path');
const passport = require('passport');
const userController = require('./api/user/user.controller.js');
const routineController = require('./api/routine/routine.controller.js');
const taskController = require('./api/task/task.controller.js');


module.exports = function(app, express) {
  var router = express.Router();

  //controller functions are in the controller.js of each folder in ./api/
  var isAuthenticated = function (req, res, next) {
    console.log("From routes - Authenticated is fired.")
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  };



  //all the routes for users
  router.route('/users')
    .get(userController.getAllUsers)
    .post(userController.addUser);


  router.post('/login', passport.authenticate('local', {
    successRedirect: '/routines',
    failureRedirect: '/signup',
    failureFlash: true
  }));


    //Authentication
  router.get('/routines', isAuthenticated, function(req, res) {
    res.render('routines')
  });

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  });
  


  router.route('/users/:userId')
    // .get(userController.addUser)
    .post(userController.addUser)
    .put(userController.updateAUser)
    .delete(userController.deleteAUser);

  //all the routes for routines
  router.route('/routines')
    .get(routineController.getMyRoutines)
    .post(routineController.addARoutine);

  router.route('/routines/:RoutineId')
    .get(routineController.getMyRoutines)
    .post(routineController.addARoutine)
    .delete(routineController.deleteARoutine);

  // router.route('/routines/:userId/:RoutineId')
  //   .get(routineController.getARoutine)
  //   .put(routineController.updateARoutine)
  //   .delete(routineController.deleteARoutine)

  //all the routes for tasks
  router.route('/tasks')
    .get(taskController.getAllTasks)
    .post(taskController.addATask);

  router.route('/tasks/:taskId')
    .put(taskController.updateATask)
    .delete(taskController.deleteATask);

    // original code with user id
  // router.route('/tasks/:userId/:RoutineId')
  //   .get(taskController.getAllTasks)
  //   .post(taskController.addATask);
  //
  // router.route('/tasks/:userId/:taskId')
  //   .put(taskController.updateATask)
  //   .delete(taskController.deleteATask);

  ///////////////////////////////////////



  // All undefined asset or api routes should return a 404
  router.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get((req, res) => {
      res.status(404);
    });

  // All other routes should redirect to the index.html
  router.route('/*')
    .get((req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });

    return router;
};
