import fs from "fs";
import path  from "path";
import csv from 'fast-csv';

import models from '../../app/models/index';

const season = 2017;

const teams = [];
const teamData = models.team.findAll();

teamData
  .then((teams) => {
    csv.fromPath(path.join(__dirname, `/${season}/schedule.csv`), { headers : true })
      .on("data", function(data) {
        const week = data.Week;
        const day = data.Day;
        const time = data.Time;
        let homeTeam;
        let awayTeam;
        let homeTeamScore;
        let awayTeamScore;
        let date;
        let yearModifier = 0;

        if (data.Date) {
          const month = data.Date.split(' ')[0];
          
          if (month === 'January' || month === 'February') {
            yearModifier = 1;
          }

          date = new Date(`${data.Date}, ${season + yearModifier}`); 
        }

        if (data.Location === '@') {
          homeTeam = data['Loser/tie'];
          awayTeam = data['Winner/tie'];

          homeTeamScore = data.PtsL ? data.PtsL : null;
          awayTeamScore = data.PtsW ? data.PtsW : null;
        } else {
          homeTeam = data['Winner/tie'];
          awayTeam = data['Loser/tie'];

          homeTeamScore = data.PtsW ? data.PtsW : null;
          awayTeamScore = data.PtsL ? data.PtsL : null;
        }

        const homeTeamId = teams.filter(t => `${t.city} ${t.mascot}` === homeTeam)[0].id;
        const awayTeamId = teams.filter(t => `${t.city} ${t.mascot}` === awayTeam)[0].id;

        if (!homeTeamId || !awayTeamId) {
          throw new Error('Missing the home or away team id');
        }
     
        const payload = {
          season,
          week,
          day,
          date,
          time,
          homeTeamId,
          awayTeamId,
          homeTeamScore,
          awayTeamScore,
        };

        models.game.create(payload);
      })
      .on('end', () => {
        console.log('Games successfully');
      });
  })
  .catch((error) => {
    console.log('an error occurred getting the teams. ', error);
  });