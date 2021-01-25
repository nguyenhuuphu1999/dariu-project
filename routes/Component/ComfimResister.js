const express = require('express');
const { Op, where } = require('sequelize');
const router = express.Router();

const ComfimRegister = require('../../models/Register');
const RegisterAccountForOwn = require('../../models/RegisterAccountForOwn');
router.post('/user', async (req,res) => {

  if(req.body.code ==req.body.checkcode){
    const ComfimPageUser = await ComfimRegister.update({
        become_a_part_of_us:1,
        id_type_user:4,
    },{
       where:{
        email:req.body.email
       }
    }
    )

    const UpdateKeyRegidterInOwn = await RegisterAccountForOwn.update(
        {key_register:''},
            {
                where:{
                    email:req.body.email
                }
            }
    )
  }

res.json({
    data:"Update Successfull"
})

}); 


module.exports = router;
