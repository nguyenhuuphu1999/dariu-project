const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();

const booking = require('../../models/ApartmentBooking');
router.post('/', async (req,res) => {

    const  infoBooking = await booking.create({

        id_apartment:req.body.id_apartment,
        id_user_booking:req.body.id_user,
        check_in:req.body.check_in,
        check_out:req.body.check_out,
        ho_ten:req.body.ho_ten,
        email:req.body.email,
        so_dien_thoai:req.body.so_dien_thoai,
        phi_dich_vu:req.body.phi_dich_vu,
        total:req.body.total
    })

    res.json({
        infoBooking
    })

});


module.exports = router;
