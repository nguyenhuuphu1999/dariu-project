const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const CheckBookings = require('../../models/ApartmentCheckBookings')

router.post('/checkBooking', async (req,res) => {
        
   
        console.log(req.body)
        const CheckBooking = await CheckBookings.findAll(
        {
            where:{
                [Op.and]: [{ id_apartment:req.body.id_apartment }, {[Op.or]:[{check_in:{[Op.between]: [req.body.check_in, req.body.check_out] }},{check_out:{[Op.between]: [req.body.check_in, req.body.check_out] } }]}], 
                 }
        })
        // 
       
        if(CheckBooking == ''){
            console.log("CheckBooking true")
            res.json({
                message:"Bạn có thế booking phòng vào ngày này"
            })
        }else{
            res.json({
                message:"Xin lỗi ngày này , phòng này đã có người booking"
            })
        }
       

});

module.exports = router;
