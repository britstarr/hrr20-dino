var Sequelize = require('sequelize');

//#######################__Create Connection__##############################

var db_connection = new Sequelize('app_data', 'dino', 'hrrgroup', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

//########################__Define Models__###############################

var User = db_connection.define('User', {
  id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  username: { type: Sequelize.STRING, allowNull: false, unique: true, validate: { is: /^[a-z0-9\_\-]+$/i, } },
  email: { type: Sequelize.STRING, validate: { isEmail: true } },
  firstName: {  type: Sequelize.STRING, },
  lastName: {  type: Sequelize.STRING, },
  password: { type: Sequelize.STRING, },
  salt: { type: Sequelize.STRING }
});

var Routine = db_connection.define('Routine', {
  id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  name: {type: Sequelize.STRING, unique: true, validate: {notEmpty: true}},
  description: {type: Sequelize.TEXT, validate: {notEmpty: true}},
  start_time: {type: Sequelize.TIME},
  end_time: {type: Sequelize.TIME},
  repeat: {type: Sequelize.JSON}, //this JSON object gets created/updated on the client side
  completed: {type: Sequelize.BOOLEAN}
});

var Task = db_connection.define('Task', {
  id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  name: {type: Sequelize.STRING, unique: true, validate: {notEmpty: true}},
  description: {type: Sequelize.STRING, validate: {notEmpty: true}},
  completed: {type: Sequelize.BOOLEAN}
});

var History = db_connection.define('History', {
  id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  date: {type: Sequelize.DATEONLY},
  completed: {type: Sequelize.BOOLEAN}
});

//#######################__Define Associations__##############################

User.hasMany(Routine);
Task.belongsTo(Routine);
History.belongsTo(User);
History.belongsTo(Routine);

//#######################__Sync Database and Export__##############################

db_connection.sync();
User.sync();
Routine.sync();
Task.sync();
History.sync();



exports.connection = db_connection;
exports.User = User;
exports.Routine = Routine;
exports.Task = Task;
exports.History = History;
