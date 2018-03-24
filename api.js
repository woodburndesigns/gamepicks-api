import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import env from 'dotenv';
import cors from 'cors';

env.load();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ 
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: true
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(cors({ origin: true, credentials: true }));

const models = require("./app/models");
const authRoute = require('./app/routes/auth.js')(app, passport);

require('./app/config/passport/passport.js')(passport, models.user);

app.use(require('forest-express-sequelize').init({
  modelsDir: __dirname + '/app/models', // Your models directory.
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  sequelize: require('./app/models').sequelize // The sequelize database connection.
}));

//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});

const port = process.env.PORT;
app.listen(port, () => console.log(`API listening on port ${port}!`));