var exports = module.exports = {};
exports.sessions = function(req, res) {
  res.json(req.user);
}

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.sendStatus(200);
  });
}