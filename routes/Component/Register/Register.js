const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const nodemailer = require("nodemailer");
const mailer =require('../../Modul/Mailer');

const Register = require('../../../models/Register');
const RegisterAccountForOwn = require('../../../models/RegisterAccountForOwn');

router.post('/', async (req,res) => {

    var flagCheckEmail = true;
    console.log(req.query.type)

    if(req.query.type == "user"){

        const checkEmail = await Register.findOne({
            where:{
                email:req.body.email
            }
        })
        if(checkEmail == null){
            const register = await Register.create({
                username:req.body.username,
                passwd:req.body.passwd,
                id_type_user:2,
                full_name:req.body.full_name,
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
                message:"Register successfull",
                register:register,
                error:false
            });
        }else{
            
            res.json({ 
                message:"Register fail , please check your email . ",
                error:true
            });
        }

       
    }else{

        const checkEmail = await RegisterAccountForOwn.findOne({
            where:{
                email:req.body.email
            }
        })
        console.log(checkEmail)
        if(checkEmail == null){
        const random =  Math.floor(Math.random() * 1000000);

        const email= req.body.email;
        const title = "Ma Xac Nhan";
        const content = '<h1 style="color: red">Welcome you to Go</h1><p> </p>Your confirmation code is: '+random+'</p> <div> <i>Please enter the above confirmation code to login to your account !</i> </div>';
    
        const transporter = mailer.transporter();
        const mailOptions = mailer.mailOptions(email,title,content)
    
        transporter.sendMail(mailOptions, (error, info) => {
            // if (error) {
            //     res.json({
            //         error
            //     })
            // }
    
        });


        const register = await RegisterAccountForOwn.create({
            username :req.body.username,
            id_type_user :4,
            full_name :req.body.full_name,
            avatar :null,
            resert:0,
            key_register:random,
            phone_number:req.body.phone_number,
            email:req.body.email,
            created_at:Date.now(),
            status:0 ,
            language:"",
            about:"",
            avartar:""
        })
    
        res.json({ 
            message:"Register successfull",
            register:register,
            error:false
        });
    }else{
            
        res.json({ 
            message:"Register fail , please check your email . ",
            error:true

        });
    }

    }
   

}); 


module.exports = router;
