module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
  }, {});

  Address.associate = function(models) {
    // An address belongs to a user
    Address.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
  };

  return Address;
};
