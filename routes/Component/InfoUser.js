const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const User = require('../../models/User');

router.get('/', async (req,res) => {

    const user = await User.findOne({
        where:{
            id:req.query.idUser
        },
        
    })
   
  res.json({ 
    user
  });

}); 


module.exports = router;
