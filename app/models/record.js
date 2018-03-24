module.exports = function(sequelize, Sequelize) {
  const Record = sequelize.define('record', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    season: {
      type: Sequelize.INTEGER,
    },
    wins: {
      type: Sequelize.INTEGER,
    },
    losses: {
      type: Sequelize.INTEGER,
    },
    ties: {
      type: Sequelize.INTEGER,
    },
    winPct: {
      type: Sequelize.FLOAT,
    },
    pointsFor: {
      type: Sequelize.INTEGER,
    },
    pointsAgainst: {
      type: Sequelize.INTEGER,
    }
  });

  Record.associate = function(models) {
    Record.belongsTo(models.team);
  } 

  return Record;
}