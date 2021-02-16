const express = require('express');
const jwt = require('jsonwebtoken');
var controller = require('../../Token/Controllers/Auth.controllers');
var router = express.Router();
const User  = require('../../models/User');
const Token = require('../../models/Token');
const { Sequelize } = require('../../models/sequelize');
const Op = Sequelize.Op;
router.post('/user',async(req,res)=>{
    
    const result =  await User.findOne({
        where:{
           [Op.and]:{ email : req.body.email,passwd:req.body.passwd}
        }
    })

    

    if(result !=null){
        const data = {
            Fullname:result.full_name,
            email:result.email
        }
        const token = jwt.sign({ data:{data} },process.env.KEYTOKEN +'_'+result.email , { algorithm:'HS512',expiresIn:'1h'});
        
        const resultToken = await Token.findOne({
            where:{
                id_user:result.id
            }
        })
      
        if(resultToken == null ){
            const resultAddToken = await Token.create({
                id_user:result.id,
                token:token,
                expiration:(Date.now())
            })
        }
            res.json({
                id:result.id,
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