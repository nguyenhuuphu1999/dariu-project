const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const Apartment = require('../../models/Apartment');
const ApartmentPhoto = require('../../models/ApartmentPhoto');
const DiaDiemNoiBat = require('../../models/DiaDiemNoiBat');
const { query } = require('../../models/sequelize');


router.get('/diaDiemNoiBatChiTiet', async (req,res) => {

    const diaDiemNoiBatChiTiet = await Apartment.findAll({ 
        where:{
            id_city:req.query.idDetail
        },
        include:[{
            model:ApartmentPhoto,
            as:'apartment_image',
            attributes:['url_image']
        }]
    });

   

    const diaDiemNoiBat = await DiaDiemNoiBat.findAll({

    })

    res.json({
        diaDiemNoiBatChiTiet,diaDiemNoiBat
    })
});


module.exports = router;
