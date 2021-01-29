const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();

const UpdateProfileOwn= require('../../../models/RegisterAccountForOwn');

router.put('/own', async (req,res) => {

    const checkOwn = await UpdateProfileOwn.findAll({
        where:{
            id:req.body.id
        }
    })


   
    if(checkOwn != ""){
        console.log("123zo")
        const typeApartment = await UpdateProfileOwn.update(
            {
               
                about:req.body.about,
                email:req.body.email,
                phone_number:req.body.phone_number,
                full_user:req.body.full_user,
                language:req.body.language,
            },{
                where:{
                    id:req.body.id
                }
            }
            
        )

    res.json({ 
        message:"UpdateProfile for " +req.body.id + " succsessfull"
    });
    }else{
    res.json({message:"Tai khoan vua nhap khong ton tai"})
    }
   

});


module.exports = router;
