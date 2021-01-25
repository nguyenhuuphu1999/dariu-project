const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const TypeHouse = require('../../models/TypeHouse');
const Apartment = require('../../models/Apartment');
const DiaDiemNoiBat = require('../../models/DiaDiemNoiBat');
const Comment = require('../../models/ApartmentComment');
const User = require('../../models/User');


router.get('/', async (req,res) => {

  const typeHouse = await TypeHouse.findAll({ 

   });
  
  const apartment = await Apartment.findAll({
    where:{id_city:1 },
    limit:8
  });
  const diaDiemNoiBat = await DiaDiemNoiBat.findAll({

  });

  const comment = await Comment.findAll({
    limit:3,
    where:{
      rattings:{
        [Op.gte]:5
      }
    },
    include:[{
      model:User,
      as:'user',
      attributes: ['address']
    }]
  })

  res.json({ 
    data: {
      typeHouse,apartment,diaDiemNoiBat,comment
      // ,comments
    } 
  });

});


module.exports = router;
