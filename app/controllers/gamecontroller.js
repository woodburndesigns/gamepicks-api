var exports = module.exports = {};
var Game = require("../models").game;
var Team = require("../models").team;

exports.games = function(req, res) {
  let promise;

  const options = {
    include: [
      {
        model: Team,
        as: 'homeTeam'
      },
      {
        model: Team,
        as: 'awayTeam'
      }
    ],
    order: [
      ['date', 'ASC']
    ]
  };

  if (req.params.id) {
    promise = Game.findById(req.params.id, options);
  } else {
    promise = Game.findAll(options);
  }
  
  promise
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error });
    });
  
}