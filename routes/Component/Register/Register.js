const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const nodemailer = require("nodemailer");
const mailer =require('../../Modul/Mailer');
const jwt = require('jsonwebtoken');
const Register = require('../../../models/Register');
const RegisterAccountForOwn = require('../../../models/RegisterAccountForOwn');
const { request } = require('express');
const Token = require('../../../models/Token');
const User_own = require('../../../models/User_own');
router.post('/', async (req,res) => {
    console.log(req.body)
    var flagCheckEmail = true;
    console.log(req.query.type)
    if(req.query.type == "user"){

        const checkEmail = await Register.findOne({
            where:{
                email:req.body.email
            }
        })
        const userData = {
           
            name: req.body.username,
            email: req.body.email,
          }
       

        if(checkEmail == null){ /// dang ky user thuong
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
                created_at:Date.now(),
                description:''
            })

           

            const data = { // data tao token
                Fullname: req.body.full_name,
                email: req.body.email,
              };
              const token = jwt.sign(//  tao token
                { data: { data } },
                process.env.KEYTOKEN + "_" + req.body.email,
                { algorithm: "HS512", expiresIn: "1h" }
              );
             
              const resultAddToken = await Token.create({ // save token cho user thuong moi dang ky
                id_user: register.id,
                token: token,
                create_date: new Date()
                  .toISOString()
                  .split(".")[0]
                  .replace(/T/, " "),
                type: "nguoi dung",
                expiration: new Date(
                  new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                )
                  .toISOString()
                  .split(".")[0]
                  .replace(/T/, " "),
              });
        
            res.json({ 
                message:"Register user thuong successfull",
                register:register,resultAddToken,
                error:false
            });
        }else if(req.query.type == "user"){ // dang ky cho user chu nha
            
            res.json({ 
                message:"Register use thuong fail , please check your email . ",
                error:true
            });
        }

       
    }else{

        const checkEmail = await User_own.findOne({
            where:{
                email:req.body.email
            }
        })
        console.log(checkEmail)
        if(checkEmail == null){
        // const random =  Math.floor(Math.random() * 1000000);

        // const email= req.body.email;
        // const title = "Ma Xac Nhan";
        // const content = '<h1 style="color: red">Welcome you to Go</h1><p> </p>Your confirmation code is: '+random+'</p> <div> <i>Please enter the above confirmation code to login to your account !</i> </div>';
    
        // const transporter = mailer.transporter();
        // const mailOptions = mailer.mailOptions(email,title,content)
    
        // transporter.sendMail(mailOptions, (error, info) => {
         
        // });


        const register = await User_own.create({
            username:req.body.username,
            id_type_user:4,
            full_name:req.body.full_name,
            passwd: req.body.passwd,
            phone_number:req.body.phone_number,
            email:req.body.email	,
            about:'',
            created_at:new Date()
            .toISOString()
            .split(".")[0]
            .replace(/T/, " "),
            avartar:'',
            status:1
        })

        const data = { // data tao token
            Fullname: req.body.full_name,
            email: req.body.email,
          };
          const token = jwt.sign(//  tao token
            { data: { data } },
            process.env.KEYTOKEN + "_" + req.body.email,
            { algorithm: "HS512", expiresIn: "1h" }
          );
         
          const resultAddToken =await Token.create({ // save token cho user thuong moi dang ky
            id_user: register.id,
            token: token,
            create_date: new Date()
              .toISOString()
              .split(".")[0]
              .replace(/T/, " "),
            type: "chu nha",
            expiration: new Date(
              new Date().getTime() + 30 * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .split(".")[0]
              .replace(/T/, " "),
          })
    console.log(resultAddToken)
          

        res.json({ 
            message:"Register user chu nha successfull",
            register:register,resultAddToken,
            error:false
        });
    }else{
            
        res.json({ 
            message:"Register user chu nha fail , please check your email . ",
            error:true

        });
    }

    }
   

}); 



module.exports = router;
