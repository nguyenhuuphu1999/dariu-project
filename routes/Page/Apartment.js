const express = require("express");
const { Op, where } = require("sequelize");
const Apartment = require("../../models/Apartment");
const router = express.Router();

const booking = require("../../models/ApartmentBooking"); //apartments/
const ApartmentPhotos = require("../../models/ApartmentPhotos");
const History_booking = require("../../models/History_booking");
router.get("/city/:id/apartment", async (req, res) => {
  console.log(req.query.type);
  if (req.query.type == "hotels") {
    const result = await Apartment.findAll({
      where: {
        [Op.and]: [{ id_city: req.params.id }, { id_type_house: 1 }],
      },
      include: {
        model: ApartmentPhotos,
        as: "apartment_images",
        attributes: ["url_image"],
      },
      limit: 4,
    });
    res.json({
      result,
    });
  } else {
    if (req.query.type == "apartment") {
      const result = await Apartment.findAll({
        where: {
          [Op.and]: [{ id_city: req.params.id }, { id_type_house: 2 }],
        },
        include: {
          model: ApartmentPhotos,
          as: "apartment_images",
          attributes: ["url_image"],
        },
        limit: 4,
      });
      res.json({
        result,
      });
    } else {
      if (req.query.type == "motels") {
        const result = await Apartment.findAll({
          where: {
            [Op.and]: [{ id_city: req.params.id }, { id_type_house: 3 }],
          },
          include: {
            model: ApartmentPhotos,
            as: "apartment_images",
            attributes: ["url_image"],
          },
          limit: 4,
        });
        res.json({
          result,
        });
      }else{
        if (req.query.type == "tret") {
            const result = await Apartment.findAll({
              where: {
                [Op.and]: [{ id_city: req.params.id }, { id_type_house: 4 }],
              },
              include: {
                model: ApartmentPhotos,
                as: "apartment_images",
                attributes: ["url_image"],
              },
              limit: 4,
            });
            res.json({
              result,
            });
          }
      }
    }
  }
});

router.post('/lich_su_dat_hang', async (req, res) => {
  console.log(req.body)
  const result = await History_booking.create({
    id_user: req.body.id_user,
    name_apartment: req.body.name_apartment,
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    so_ngay:req.body.so_ngay,
    so_tien:req.body.so_tien,
    tong_tien:req.body.tong_tien,
    image:req.body.image,
    ma_hoa_don:req.body.ma_hoa_don
  })
  res.json({
    message:'add history booking successfully',
    Data:result,
    error:false
  })

})


router.get('/lich_su_dat_hang/:id', async (req, res) => {
  console.log(req.body)
  const result = await History_booking.findAll({
      where:{
        id_user:req.params.id
      }
  })
  res.json({
    message:'get history booking for user successfully',
    Data:result,
    error:false
  })

})

router.get('/lich_su_dat_hang/:id', async (req, res) => {
  console.log(req.body)
  const result = await History_booking.findAll({
      where:{
        id_user:req.params.id
      }
  })
  res.json({
    message:'get history booking for user successfully',
    Data:result,
    error:false
  })

})

router.get('/lich_su_dat_hang/:id/detail', async (req, res) => {
  console.log(req.body)
  const result = await History_booking.findAll({
      where:{
        id:req.params.id
      }
  })
  res.json({
    message:'Lich su booking khach hang theo id lich su',
    Data:result,
    error:false
  })

})

module.exports = router;
