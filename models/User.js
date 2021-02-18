const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const ApartmentComment = require('./ApartmentComment');
class User extends Model {}

User.init({
  full_name:DataTypes.STRING,
  email:DataTypes.STRING,
  phone_number:DataTypes.STRING,
  address: DataTypes.STRING,
  description:DataTypes.STRING,
  created_at:DataTypes.DATE	,
  avatar:DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'User', 
    tableName: 'bnb_users',
    timestamps: false
});
User.hasMany(ApartmentComment, {
  foreignKey: 'id_user'
});

ApartmentComment.belongsTo(User, {
  as: 'user',
  foreignKey: 'id_user'
});
module.exports = User


// User.hasMany(Apartment)