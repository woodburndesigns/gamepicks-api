var exports = module.exports = {};
var User = require("../models").user;

exports.users = function(req, res) {
  User.findAll({ raw: true })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error });
    });
  
}