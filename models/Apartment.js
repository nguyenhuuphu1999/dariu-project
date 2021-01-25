const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class Apartment extends Model {}

Apartment.init({
    
    id_city:DataTypes.STRING,
    id_type_house:DataTypes.STRING,
    apartment_name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    ratings :DataTypes.NUMBER,
   
}, { 
    sequelize, 
    modelName: 'Apartment',
    tableName: 'bnb_apartment',
    timestamps: false
});


module.exports = Apartment