const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const Register = require('../../models/Register');
router.post('/user', async (req,res) => {

    console.log("hehe")
    const register = await Register.create({
        username:req.body.username,
        passwd:req.body.passwd,
        id_type_user:2,
        full_user:req.body.full_user,
        date_of_birth:req.body.date_of_birth,
        address:req.body.address,
        email:req.body.email,
        avatar:null,
        resert:0,
        phone_number:req.body.phone_number,
        become_a_part_of_us:0,
        created_at:Date.now()
    })
   
    res.json({ 
        register
    });

}); 


module.exports = router;
