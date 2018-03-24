module.exports = function(sequelize, Sequelize) {
  const Team = sequelize.define('team', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    city: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    mascot: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    short_name: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    icon: {
      type: Sequelize.TEXT
    },
  });

  Team.associate = function(models) {
    Team.belongsTo(models.division);
  };

  return Team;
}