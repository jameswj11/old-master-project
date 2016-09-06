'use strict'
const router   = require('express').Router()
const apiModel = require('../models/api.js')
const jsonData = require('../old-masters.json')

router.get('/', apiModel.getArt, (req, res)=>{
  res.json(res.art)
})

module.exports = router;
