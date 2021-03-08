const express  = require('express');
const jwt  = require('jsonwebtoken');
const app = require('../../app');
const Token = require('../../models/Token');
const User = require('../../models/User');
const router = express.Router();

// module.exports= router((req,res,next)=>{
//     console.log(req.header);
// })
// eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0ZW4iOiJuZ3V5ZW4gaHV1IHBodSIsImlhdCI6MTYxMzExMjEwNCwiZXhwIjoxNjEzMTE1NzA0fQ.5cpL12dWPrqO3aMCIYzmUrWvXGBnTKjxRoyUX-yrEuIp62KRuJxUlbpMHBwiEMZ3m-EMgFa80Ke4T2CZvkhoKA"

router.use(function async(req,res,next){
    console.log(req.headers.authorization)
    if( req.headers && req.headers.authorization)
    {
        var key_id_user = ''
        var key_token = req.headers.authorization.split(' ')[1];
       const resultToken = Token.findOne({
           where:{
               token : key_token
           }
       })
       resultToken.then((result)=>{
            if(result != null){
                const result_info_user = User.findOne({
                    where:{
                        id:result.id_user
                    }
                })
                result_info_user.then((result)=>{
                    res.json({
                        data:result,
                        err:false
                    })
                })
            }else{
                res.json({
                    data:result,
                    err:true
                })
              
            }
       }) 
    }else{
       next();
    }

   
})

module.exports = router

 // jwt.verify(token,'phunguyen',(err ,decode) => {
        //     if(err){
        //         return res.status(403).json({message:"token invalid"})
        //     }else{
        //         return next();
        //     }
        // })