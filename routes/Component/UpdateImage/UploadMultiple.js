const express = require('express');
const router = express.Router();
var cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require("path");
var fs = require('fs');
const MethodUploadFile = require('../../Component/UpdateImage/MethodUploadmultiple .js')
const  upload = multer({
    dest: path.join(__dirname, "../../../public/images")
})

router.post('/multiple',upload.array("upload_file_input",6),async (req,res,next)=>{

    // console.log(req.file.path)
    var temPath = await req.files.map(async function(file){
      // const result = await  MethodUploadFile.MethodUploadFilemMultiple(res,file.path);
        console.log("dong 1" + file.path)
    });
    console.log("dong 2" + temPath.path)
    // res.json({temPath})
    // var pathSave = path.join(__dirname,'../../../public/images/image.jpg')
    // // const fileGettingUploaded = path.join(__dirname, "../../../public/images/Screenshot.png");

  // const result =  MethodUploadFile.MethodUploadFilemMultiple(res,temPath);
  //   console.log(result)
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