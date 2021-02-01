const { Sequelize,Model,DataTypes} = require('sequelize')
const sequelize = require('./sequelize');

class City extends Model{}


City.init({

    id:{
        primaryKey:true,
       type:DataTypes.NUMBER
    },
    id_country:DataTypes.NUMBER,
    name_city:DataTypes.STRING,
    image_url:DataTypes.STRING,
    description:DataTypes.STRING
},{
    sequelize,
    modelName:'City',
    tableName:'bnb_city',
    timestamps:false

});

module.exports = City;