'use strict'
const router   = require('express').Router()
const apiModel = require('../models/api.js')

router.get('/', apiModel.searchArt, (req, res)=>{
  res.json(res.art)
})

module.exports = router;
