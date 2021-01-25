const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const Promotion = require('../models/Promotion');

router.get('/', async (req,res) => {
  const now = new Date();

  const promotions = await Promotion.findAll({
    where: {
      expiration_date: {
        [Op.gt]: now
      }
    }
  });

  res.json({ data: promotions })
});


module.exports = router;
