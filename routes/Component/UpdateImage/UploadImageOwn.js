const express = require('express');
const router = express.Router();
var cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require("path");
var fs = require('fs');

const  upload = multer({
    dest :"../public/images/"
})

router.post('/profile',(req,res,next)=>{

    // var temPath = req.file. path;
    // console.log("dong 1" + temPath)
    // var pathSave = path.join(__dirname,'../../../public/images/image.jpg')
    const fileGettingUploaded = "../../../public/images/image.jpg";


    cloudinary.uploader.upload(fileGettingUploaded, function(result, error) {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).json(error);
        }
    });

    // cloudinary.uploader.upload('image.jpg')
   

    // console.log("dong 2" +pathSave)
    // try{
    //     fs.renameSync(temPath,pathSave);
    // }
    // catch(err){
    //     console.log(err);
    // }
    
    // res.json('senfile succsessfull' + pathSave);
 
})

module.exports = router;