// EXPRESS
// ----------
const express = require('express');
const app = express();

// LOCAL VARIABLES
// ----------
app.locals.appName = "Thoreddit";

// BODY PARSER
// ----------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// COOKIE-SESSION
// ----------
const cookieSession = require("cookie-session");
app.use(cookieSession({
  name: "session", 
  keys: [process.env.SESSION_SECRET || 'secret']
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.currentUser = req.session.currentUser;
  console.log(res.locals.currentUser);
  next();
});

// METHOD-OVERRIDE
// ----------
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

app.use(methodOverride(
  getPostSupport.callback, 
  getPostSupport.options
));

// PUBLIC FOLDER
// ----------
app.use(express.static(`${__dirname}/public`));

// MORGAN - LOGGING
// ----------
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);

app.use(morganToolkit());

// MONGOOSE
// ----------
const mongoose = require('mongoose');
// const bluebird = require('bluebird');
// mongoose.promise = bluebird;
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});



// ROUTING
// ----------

// Home and Login/out
var homeRoutes = require('./routes/home-routes');
app.use('/', homeRoutes);

// User Index and Profiles
var userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);

// Post Index and Post Pages
var postRoutes = require('./routes/post-routes');
app.use('/posts', postRoutes);

// Vote Routes
var voteRoutes = require('./routes/vote-routes');
app.use('/votes', voteRoutes);



// HANDLEBARS TEMPLATES
// ----------
const expressHandlebars = require('express-handlebars');
const helpers = require('./helpers');

const hbs = expressHandlebars.create({
  helpers: helpers,
  partialsDir: 'views/',
  defaultLayout: 'application', 
  
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// SERVER
// ----------

const port = process.env.PORT;
app.listen(port);

// ERROR HANDLING
// ----------
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).render('errors/500', { error: err });
});


module.exports = app;