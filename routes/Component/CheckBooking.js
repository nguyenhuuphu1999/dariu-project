const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const CheckBookings = require('../../models/ApartmentCheckBookings')

router.get('/checkBooking', async (req,res) => {

    const CheckBooking = await CheckBookings.findAll(
    {
        where:{
            id_apartment:req.query.id
        }
    })

    res.json({
        data:CheckBooking
    })
  
});

module.exports = router;
