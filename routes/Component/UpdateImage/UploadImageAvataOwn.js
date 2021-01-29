const express = require('express');
const router = express.Router();
var cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require("path");
var fs = require('fs');
const MethodUploadFile = require('../../Component/UpdateImage/MethodUploadFile.js')
const  upload = multer({
    dest: path.join(__dirname, "../../../public/images")
})

router.post('/avatar',upload.single("upload_file_input"), async (req,res,next)=>{

    // console.log(req.file.path)
    var temPath = req.file.path;
    // console.log("dong 1" + temPath)
    // var pathSave = path.join(__dirname,'../../../public/images/image.jpg')
    // // const fileGettingUploaded = path.join(__dirname, "../../../public/images/Screenshot.png");

  const result = await  MethodUploadFile.MethodUploadFile(res,temPath);
    console.log(result)
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