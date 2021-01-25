const { Sequelize, Model, DataTypes } = require('sequelize');
const Apartment = require('./Apartment');
const sequelize = require('./sequelize');

class ApartmentPhotos extends Model {}

ApartmentPhotos.init({
    id_partment : DataTypes.NUMBER,
    url_image: DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'ApartmentPhotos',
    tableName: 'bnb_apartment_photo_detail',
    timestamps: false
});

ApartmentPhotos.hasMany(Apartment,{
    foreignKey:'id'
  })
  
  Apartment.belongsTo(ApartmentPhotos,{
    as:'apartment_images',
    foreignKey:'id'
  })

module.exports = ApartmentPhotos