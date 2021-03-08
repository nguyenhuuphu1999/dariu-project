const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const Apartment = require('../../models/Apartment');
const ApartmentPhoto = require('../../models/ApartmentPhoto');
const DiaDiemNoiBat = require('../../models/DiaDiemNoiBat');

const ApartmentPhotos = require('../../models/ApartmentPhotos');
const ApartmentDetail = require('../../models/ApartmentDetail');
const Comment = require('../../models/ApartmentComment');
const User = require('../../models/User');

const City = require('../../models/City');

const TypeHouse = require('../../models/TypeHouse');

const { query } = require('../../models/sequelize');


router.get('/city/:id/apartment', async (req,res) => {

    console.log(req.query.type);
    var diaDiemNoiBatChiTiet = '';
    if(req.query.type == 'hotels'){
         diaDiemNoiBatChiTiet = await Apartment.findAll({ 
            where:{
                [Op.and]: [
                            {id_city:req.params.id},
                            {id_type_house:1}
                        ]
    
                
            },
            include:[{
                model:ApartmentPhoto,
                as:'apartment_image',
                attributes:['url_image']
            }]
        });
    }else if(req.query.type == 'apartment' ){
         diaDiemNoiBatChiTiet = await Apartment.findAll({ 
            where:{
                [Op.and]: [
                            {id_city:req.params.id},
                            {id_type_house:2}
                        ]
    
                
            },
            include:[{
                model:ApartmentPhoto,
                as:'apartment_image',
                attributes:['url_image']
            }]
        });
    }else if(req.query.type == 'motels'){
         diaDiemNoiBatChiTiet = await Apartment.findAll({ 
            where:{
                [Op.and]: [
                            {id_city:req.params.id},
                            {id_type_house:3}
                        ]
    
                
            },
            include:[{
                model:ApartmentPhoto,
                as:'apartment_image',
                attributes:['url_image']
            }]
        });
    }else{
         diaDiemNoiBatChiTiet = await Apartment.findAll({ 
            where:{
                [Op.and]: [
                            {id_city:req.params.id},
                            {id_type_house:4}
                        ]
    
                
            },
            include:[{
                model:ApartmentPhoto,
                as:'apartment_image',
                attributes:['url_image']
            }]
        });
    }
   

    const city = await City.findOne({
        where:{
            id:req.params.id
        }
    })

   

    const diaDiemNoiBat = await DiaDiemNoiBat.findAll({

    })

    res.json({
        city,diaDiemNoiBatChiTiet,diaDiemNoiBat
    })
});

router.get('/:id/typeApartment', async (req,res) => {

    const typeApartment = await Apartment.findAll({
        where:{
            id_type_house:req.params.id
        },
        include:[{
            model:ApartmentPhoto,
            as:'apartment_image',
            attributes:['url_image']

        }]
    })
    const typeHouse = await TypeHouse.findOne({
        where:{
            id:req.params.id
        },
        attributes:['title']
    })

    const RattingGood = await Apartment.findAll({
        where:{
            [Op.and]: [
                {
                    id_type_house:req.params.id
                }, 
                {
                    ratings:{[Op.gt]: 4}
             
                }
            ]
            
        },
       limit:4
    })
    

  res.json({ 
    typeHouse,typeApartment,RattingGood
  });

});

router.get('/:id/detail', async (req,res) => {

    const apartmentPhotos =await ApartmentPhotos.findAll({
        where:{
            id_partment:req.params.id
        },
        attributes:['url_image']
    })

    const apartment = await Apartment.findOne({
        where:{
            id:req.params.id
        },
        attributes:['id','id_city','apartment_name','price','ratings']

        
    })

    const apartmentDetail = await ApartmentDetail.findOne({
        where:{
            id_apartment:req.params.id
        },
    })

    const comment = await Comment.findAll({
        where:{
            id_apartment:req.params.id
        },
        include:[{
            model:User,
            as:'user',
            attributes:['address']
        }],
        limit:3,
        attributes:['id_apartment','comment','rattings']
    })

    res.json({
        apartmentPhotos,apartment,apartmentDetail,
        comment
    })

});

router.get("/:id", async(req,res)=>{
    console.log(req.query.type)
    const  result_apartment = await Apartment.findAll({
        where:{
            id:req.params.id
        },
        include:{
            model:ApartmentPhotos,
            as:'apartment_images',

        }
    })

    res.json({
        data:result_apartment,
        err:false,
        mess:"Lay data thnah cong "
    })
})



module.exports = router;
