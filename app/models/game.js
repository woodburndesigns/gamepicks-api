module.exports = function(sequelize, Sequelize) {
  const Game = sequelize.define('game', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    season: {
      type: Sequelize.INTEGER,
    },
    week: {
      type: Sequelize.INTEGER,
    },
    day: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    time: {
      type: Sequelize.STRING,
    },
    homeTeamScore: {
      type: Sequelize.INTEGER,
    },
    awayTeamScore: {
      type: Sequelize.INTEGER,
    },
  });

  Game.associate = function(models) {
    Game.belongsTo(models.team, { as: 'homeTeam'});
    Game.belongsTo(models.team, { as: 'awayTeam'});
    Game.hasMany(models.pick);
  }

  return Game;
}