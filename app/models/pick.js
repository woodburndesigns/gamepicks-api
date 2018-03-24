module.exports = function(sequelize, Sequelize) {
  const Pick = sequelize.define('pick', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    homeTeamScore: {
      type: Sequelize.INTEGER,
    },
    awayTeamScore: {
      type: Sequelize.INTEGER,
    },
  });

  Pick.associate = function(models) {
    Pick.belongsTo(models.user);
    Pick.belongsTo(models.game);
    Pick.belongsTo(models.team, { as: 'winner' });
  } 

  return Pick;
}