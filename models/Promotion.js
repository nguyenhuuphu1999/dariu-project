const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class Promotion extends Model {}

Promotion.init({
    promotion: DataTypes.NUMBER,
    url_image: DataTypes.STRING,
    expiration_date :DataTypes.DATE
}, { 
    sequelize, 
    modelName: 'Promotion', 
    tableName: 'bnb_promotion',
    timestamps: false
});

module.exports = Promotion