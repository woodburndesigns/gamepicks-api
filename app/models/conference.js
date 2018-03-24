module.exports = function(sequelize, Sequelize) {
  const Conference = sequelize.define('conference', {
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

  Conference.associate = function(models) {
    Conference.hasMany(models.division);
  };

  return Conference;
}