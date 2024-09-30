module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
  }, {});

  User.associate = function(models) {
    // A user can have many addresses
    User.hasMany(models.Address, { foreignKey: 'UserId', as: 'addresses' });
  };

  return User;
};