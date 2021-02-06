const express = require('express');
const router = express.Router();

const Apartment = require('../../../models/Apartment');

router.post('/' ,async(req,res)=>{
    const addPartment = await Apartment.create({
        id_city:req.body.id_city,
        id_district:req.body.id_district,
        id_type_house:req.body.id_type_house,
        apartment_name: req.body.apartment_name,
        price: req.body.price,
        ratings :req.body.ratings,
        image_url:req.body.image_url,
        id_user_own:req.body.id_user_own
    })
    res.json({
        message:"Tao phong thanh cong",
        data :addPartment
    })
})

router.put('/:id',async(req,res)=>{

    const fintAapartment =await Apartment.findOne({
        where:{
            id:req.params.id
        }
    })
console.log(fintAapartment)
    if(fintAapartment != null){
        
        const update = await Apartment.update({
            id_city:req.body.id_city,
            id_district:req.body.id_district,
            id_type_house:req.body.id_type_house,
            apartment_name: req.body.apartment_name,
            price: req.body.price,
            ratings :req.body.ratings,
            image_url:req.body.image_url,
            id_user_own:req.body.id_user_own
        },
        {
            where:{
                id:req.params.id
            }
        })

        res.json({
            message:"Update thanh cong",
            data:update,
            err:false
        })
    }else{
        res.json({
            message:"Phong ban khong ton tai",
           
            err:true
        })
    }

})
module.exports = router