var exports = module.exports = {};
var Team = require("../models").team;
var Division = require("../models").division;
var Conference = require("../models").conference;
var Game = require("../models").game;

exports.teams = function(req, res) {
  let promise;

  const options = {
    include: [{
      model: Division,
      include: [{
        model: Conference,
      }]
    }]
  };

  if (req.params.id) {
    promise = Team.findById(req.params.id, options);
  } else {
    promise = Team.findAll(options);
  }

  promise
    .then(function(user) {
      res.json(user);
    })
    .catch(function(error) {
      res.json({ error: error });
    }); 
}