'use strict';

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const config = require('./config/express');
const routes = require('./routes');
const port = process.env.PORT || 3000;

//Auth
const setupPassport = require('./auth/setupPassport');
const flash = require('connect-flash');
const router = require('./routes')(app, express);
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors());
app.options('*', cors());
app.delete('*', cors());


//Auth
app.use(cookieParser());
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))
require('./config/express')(app);
app.use(flash());
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


setupPassport(app);


app.use('/', router);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
