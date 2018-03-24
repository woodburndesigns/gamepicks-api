import models from '../../app/models/index';
import { Op } from 'sequelize';

const season = 2017;
const gameData = models.game.findAll({
  where: { 
    season: season,
    homeTeamScore: {
      [Op.not]: null,
    },
    awayTeamScore: {
      [Op.not]: null,
    }
  }
});

const initialPayload = {
  wins: 0,
  losses: 0,
  ties: 0,
  winPct: 0,
  pointsFor: 0,
  pointsAgainst: 0,
  season,
};

gameData
  .then((data) => {
    let records = {};

    function calculate(game, type) {
      const otherType = type === 'home' ? 'away' : 'home';
      const team = game[`${type}TeamId`];

      if (records[team] === undefined) {
        records[team] = Object.assign({ teamId: team }, initialPayload);
      }

      if (game[`${type}TeamScore`] > game[`${otherType}TeamScore`]) {
        records[team].wins += 1;
      } else if (game[`${type}TeamScore`] < game[`${otherType}TeamScore`]) {
        records[team].losses += 1;      
      } else {
        records[team].ties += 1;
      }

      records[team].winPct = records[team].wins / (records[team].wins + records[team].losses);
      records[team].pointsFor += game[`${type}TeamScore`];
      records[team].pointsAgainst += game[`${otherType}TeamScore`];
    }

    data.forEach(game => {
      calculate(game, 'home');
      calculate(game, 'away');
    });

    const payloads = [];

    Object.keys(records).forEach(id => {
      payloads.push(records[id]);
    })

    models.record.bulkCreate(payloads)
      .then(() => {
        console.log('records success')
      }).catch(() => {
        console.log('records error');
      })
  })
  .catch((error) => {
    console.log('an error occurred getting the games. ', error);
  });