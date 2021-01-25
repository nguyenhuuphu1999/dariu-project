const { Sequelize, Model, DataTypes } = require('sequelize');
const Apartment = require('./Apartment');
const sequelize = require('./sequelize');

class ApartmentPhoto extends Model {}

ApartmentPhoto.init({

  url_image: DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'ApartmentPhoto', 
    tableName: 'bnb_apartment_photo',
    timestamps: false
});

// Apartment.hasMany(ApartmentPhoto,{
//   foreignKey:'id'
// })

// ApartmentPhoto.belongsTo(Apartment,{
//   as:'apartment',
//   foreignKey:'id_apartment'
// })

ApartmentPhoto.hasOne(Apartment,{
  foreignKey:'id'
})

Apartment.belongsTo(ApartmentPhoto,{
  as:'apartment_image',
  foreignKey:'id'
})

module.exports = ApartmentPhoto