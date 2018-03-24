module.exports = function(sequelize, Sequelize) {
  const Division = sequelize.define('division', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  Division.associate = function(models) {
    Division.belongsTo(models.conference);
    Division.hasMany(models.team);
  };

  return Division;
}