const indexController = require('../controllers/indexcontroller.js');
const authController = require('../controllers/authcontroller.js');
const teamController = require('../controllers/teamcontroller.js');
const gameController = require('../controllers/gamecontroller.js');
const userController = require('../controllers/usercontroller.js');
const recordController = require('../controllers/recordcontroller.js');

module.exports = function(app, passport) {
  app.post('/register', passport.authenticate('local-signup'), authController.sessions);

  app.get('/sessions', isLoggedIn, authController.sessions);
  app.post('/sessions', passport.authenticate('local-signin'), authController.sessions);
  app.delete('/sessions', authController.logout);

  app.get('/teams/:id?', isLoggedIn, teamController.teams);

  app.get('/games/:id?', isLoggedIn, gameController.games);

  app.get('/standings/:id?', isLoggedIn, recordController.records);

  app.get('/users/:id?', isLoggedIn, userController.users);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {      
      next();
    } else {
      res.sendStatus(401);
    }
  }
}