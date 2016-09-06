'use strict'
const router   = require('express').Router()
const request  = require('request')
const jsonData = require('../old-masters.json')

module.exports = {
  getArt: function(req, res, next){
    res.art = jsonData;
    next()
  }
}
