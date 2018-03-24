var exports = module.exports = {};
import { 
  record as Record,
  team as Team,
  division as Division,
  conference as Conference
} from '../models';

exports.records = function(req, res) {
  let promise;

  const options = {
    include: [{
      model: Team,
      include: [{
        model: Division,
        include: [{
          model: Conference,
        }]
      }]
    }],
    order: [
      ['wins', 'DESC']
    ],
  };

  if (req.params.id) {
    promise = Record.findById(req.params.id, options);
  } else {
    promise = Record.findAll(options);
  }
  
  promise
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) { 
      res.json({ error: error });
    }); 
}