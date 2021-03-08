const express = require('express');
const jwt = require('jsonwebtoken');
var controller = require('../../Token/Controllers/Auth.controllers');
var router = express.Router();
const User  = require('../../models/User');
const Token = require('../../models/Token');
const { Sequelize } = require('../../models/sequelize');
const Op = Sequelize.Op;
const Auth = require('../../Token/Controllers/Auth.controllers.js')
router.post('/user',Auth,async(req,res)=>{
   
    console.log(req.body)
    const result =  await User.findOne({
        where:{
           [Op.and]:{ email : req.body.email,passwd:req.body.passwd}
        }
    })

    console.log(result)

    if(result !=null){
        const data = {
            Fullname:result.full_name,
            email:result.email
        }
        const token = jwt.sign({ data:{data} },process.env.KEYTOKEN +'_'+result.email , { algorithm:'HS512',expiresIn:'1h'});
          const resultAddToken = await Token.create({
                 id_user:result.id,
                 token:token,
                 expiration:(Date.now())
             })
            
        
         res.json({
             Data:result,
             access_token:token,
             err:false
         })
    }else{
        res.json({
            message:'Email or password invaild',
            err:true
        })

    }
       
  
})


module.exports= router;