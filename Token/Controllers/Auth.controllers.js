const express  = require('express');
const jwt  = require('jsonwebtoken');
const app = require('../../app');
const router = express.Router();

// module.exports= router((req,res,next)=>{
//     console.log(req.header);
// })
// eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0ZW4iOiJuZ3V5ZW4gaHV1IHBodSIsImlhdCI6MTYxMzExMjEwNCwiZXhwIjoxNjEzMTE1NzA0fQ.5cpL12dWPrqO3aMCIYzmUrWvXGBnTKjxRoyUX-yrEuIp62KRuJxUlbpMHBwiEMZ3m-EMgFa80Ke4T2CZvkhoKA"

router.use(function(req,res,next){
    if( req.headers && req.headers.authorization)
    {
        // console.log(req.headers.authorization.split(' ')[0])
        var token = req.headers.authorization.split(' ')[1];

        console.log(token)
        jwt.verify(token,'phunguyen',(err ,decode) => {
            if(err){
                return res.status(403).json({message:"token invalid"})
            }else{
                return next();
            }
        })
    }else{
        return res.status(403).json({message:'Unauthorization'})
    }
})

module.exports = router