const express = require("express");
const { Op } = require("sequelize");
const ApartmentCheckBookings = require("../../models/ApartmentCheckBookings");
const router = express.Router();

const CheckBookings = require("../../models/ApartmentCheckBookings");

router.post("/checkBooking", async (req, res) => {
  console.log(req.body)
  


  const CheckBooking = await CheckBookings.findAll({
    where: {
      id_apartment: req.body.id_apartment,
    },
  });
  if (CheckBooking.length > 0) {
    const CheckBooking = await CheckBookings.findAll({
      
      where: {
        [Op.or]: [
          {
            check_in: {
              [Op.between]: [req.body.check_in, req.body.check_out],
            },
          },
          {
            check_out: {
              [Op.between]: [req.body.check_in, req.body.check_out],
            },
          },
          {
            check_in:{
              [Op.gte]:req.body.check_in
            }
          }
        ],
      },
    });


    if (CheckBooking == "") {
      res.json({
        message: "Bạn có thế booking phòng vào ngày này",
        err: false,
      });
    } else {
      res.json({
        message: "Xin lỗi ngày này , phòng này đã có người booking",
        err: true,
      });
    }
  }else{
    res.json({
      message: "Bạn có thế booking phòng vào ngày này",
      err: false,
    });
  }
});

router.get("/:id/checkBooking", async (req, res) => {
  const result = await CheckBookings.findAll({
    where: {
      id_apartment: req.params.id,
    },
  });
  // .then(item=>{
  //   console.log(item)
  // })

  res.json({
    message: "get check bookin thanh cong",
    data: result,
    err: false,
  });
});

router.post("/booking", async (req, res) => {
  console.log(req.body)
  const result = await CheckBookings.create({
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    id_apartment: req.body.id_apartment,
    id_user_booking: req.body.id_user_booking
  });
 
  

  res.json({
    message: "ban da dat phong thanh cong ",
    data: result,
    err: false,
  });
  
});

module.exports = router;
